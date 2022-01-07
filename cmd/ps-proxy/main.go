package main

import (
	"context"
	"flag"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

const (
	sh = "sh"
)

func main() {
	laddr := flag.String("laddr", "localhost:1312", "Listen address for the proxy")

	saddr := flag.String("saddr", "localhost:1313", "Address to proxy all other requests too")
	scmd := flag.String("scmd", "hugo server -D --baseUrl=/ --appendPort=false", "Command to run before proxying all other requests")

	aaddr := flag.String("aaddr", "localhost:1314", "Address to proxy request on /api too")
	acmd := flag.String("acmd", "go run ./cmd/ps-api", "Command to run before proxying to /api")

	https := flag.Bool("https", false, "Use HTTPS to connect to upstreams")

	flag.Parse()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	site := exec.CommandContext(ctx, sh, "-c", *scmd)
	api := exec.CommandContext(ctx, sh, "-c", *acmd)

	site.Stdout = os.Stdout
	api.Stdout = os.Stdout
	site.Stderr = os.Stderr
	api.Stderr = os.Stderr
	site.Stdin = os.Stdin
	api.Stdin = os.Stdin

	site.Start()
	api.Start()

	log.Println("Proxy listening on", *laddr, "proxying to", *saddr, "(site) and", *aaddr, "(API)")

	panic(http.ListenAndServe(*laddr, http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		r.URL.Scheme = "http"
		if *https {
			r.URL.Scheme = "https"
		}

		r.URL.Host = *saddr
		if strings.HasPrefix(r.URL.Path, "/api/") {
			r.URL.Host = *aaddr

			log.Println("Proxying request to API", r.URL)
		} else {
			log.Println("Proxying request to site", r.URL)
		}

		res, err := http.DefaultTransport.RoundTrip(r)
		if err != nil {
			log.Println("Could not proxy request:", err)

			http.Error(rw, err.Error(), http.StatusBadGateway)

			return
		}

		for key, values := range res.Header {
			for _, value := range values {
				rw.Header().Add(key, value)
			}
		}

		rw.WriteHeader(res.StatusCode)

		if _, err := io.Copy(rw, res.Body); err != nil {
			log.Println("Could send result to client:", err)

			return
		}
	})))
}
