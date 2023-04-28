package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	spotifyauth "github.com/zmb3/spotify/v2/auth"
)

var (
	state = "your-state-string"
)

func main() {
	redirectURL := flag.String("redirect-url", "http://localhost:1318/callback", "Redirect URI")
	clientID := flag.String("client-id", "", "Spotify Client ID")
	clientSecret := flag.String("client-secret", "", "Spotify Client Secret")

	flag.Parse()

	auth := spotifyauth.New(
		spotifyauth.WithClientID(*clientID),
		spotifyauth.WithClientSecret(*clientSecret),
		spotifyauth.WithRedirectURL(*redirectURL),
		spotifyauth.WithScopes("user-read-currently-playing"))

	http.HandleFunc("/callback", func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		if code == "" {
			http.Error(w, "Couldn't get access code", http.StatusForbidden)
			log.Fatal("Couldn't get access code")
		}

		fmt.Printf("Access code: %s\n", code)
		fmt.Fprintf(w, "Got the access code!")
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {})

	go func() {
		url := auth.AuthURL(state)
		fmt.Println("Please log in to Spotify by visiting the following page in your browser:", url)
	}()

	panic(http.ListenAndServe(":1318", nil))
}
