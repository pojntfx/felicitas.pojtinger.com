package main

import (
	"context"
	"flag"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path"
	"strings"
)

const (
	sh = "sh"
)

func main() {
	laddr := flag.String("laddr", "localhost:1312", "Listen address for the proxy")

	surl := flag.String("surl", "http://localhost:1313/", "URL to proxy all other requests too")
	scmd := flag.String("scmd", "hugo server -D --baseUrl=/ --appendPort=false", "Command to run before proxying all other requests")

	aurl := flag.String("aurl", "http://localhost:1314/", "URL to proxy request on /api too")
	acmd := flag.String("acmd", "go run ./cmd/ps-api", "Command to run before proxying to /api")

	verbose := flag.Bool("verbose", false, "Enable verbose logging")

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

	log.Println("Proxy listening on", *laddr, "proxying to", *surl, "(site) and", *aurl, "(API)")

	panic(http.ListenAndServe(*laddr, http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		var upstream *url.URL

		if strings.HasPrefix(r.URL.Path, "/api/") {
			up, err := url.Parse(*aurl)
			if err != nil {
				log.Println("Could not parse API URL", err)
			}
			upstream = up

			if *verbose {
				log.Println("Proxying request to API", r.URL)
			}
		} else {
			up, err := url.Parse(*surl)
			if err != nil {
				log.Println("Could not parse site URL", err)
			}
			upstream = up

			if *verbose {
				log.Println("Proxying request to site", r.URL)
			}
		}

		r.URL.Scheme = upstream.Scheme
		r.URL.Host = upstream.Host

		previousPath := r.URL.Path
		r.URL.Path = path.Join(upstream.Path, r.URL.Path) // path.Join might strip trailing slashes, leading to errors when redirecting
		if strings.HasSuffix(previousPath, "/") && !strings.HasSuffix(r.URL.Path, "/") {
			r.URL.Path += "/"
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
