package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/pojntfx/personal-site/api/twitch"
)

func main() {
	clientID := flag.String("clientID", "", "Twitch API client ID")
	clientSecret := flag.String("clientSecret", "", "Twitch API client secret")
	username := flag.String("username", "", "Twitch username to get status for")
	laddr := flag.String("laddr", "localhost:1314", "Listen address for the API")

	flag.Parse()

	if *clientID == "" {
		*clientID = os.Getenv("TWITCH_CLIENT_ID")
	}

	if *clientSecret == "" {
		*clientSecret = os.Getenv("TWITCH_CLIENT_SECRET")
	}

	if *username == "" {
		*username = os.Getenv("TWITCH_USERNAME")
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/twitch", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Twitch API:", err)

				http.Error(rw, "Error occured in Twitch API", http.StatusInternalServerError)

				return
			}
		}()

		twitch.TwitchStatusHandler(rw, r, *clientID, *clientSecret, *username)
	})

	log.Println("API listening on", *laddr)

	panic(http.ListenAndServe(*laddr, mux))
}
