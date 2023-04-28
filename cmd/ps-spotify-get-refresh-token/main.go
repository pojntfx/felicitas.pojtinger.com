package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
)

const (
	authURL  = "https://accounts.spotify.com/authorize"
	tokenURL = "https://accounts.spotify.com/api/token"
	scope    = "user-read-currently-playing"
)

type tokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

var (
	errClientIDEmpty     = errors.New("missing client ID")
	errClientSecretEmpty = errors.New("missing client secret")
	errRedirectURLEmpty  = errors.New("missing redirect URL")
)

func main() {
	clientID := flag.String("client-id", "", "Client ID to use")
	clientSecret := flag.String("client-secret", "", "Client secret to use")
	redirectURL := flag.String("redirect-url", "", "Redirect URL to use")

	flag.Parse()

	if strings.TrimSpace(*clientID) == "" {
		panic(errClientIDEmpty)
	}

	if strings.TrimSpace(*clientSecret) == "" {
		panic(errClientSecretEmpty)
	}

	if strings.TrimSpace(*redirectURL) == "" {
		panic(errRedirectURLEmpty)
	}

	http.HandleFunc("/callback", func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")
		if code == "" {
			http.Error(w, "Code not found", http.StatusBadRequest)
			return
		}

		data := url.Values{}
		data.Set("grant_type", "authorization_code")
		data.Set("code", code)
		data.Set("redirect_uri", *redirectURL)
		data.Set("client_id", *clientID)
		data.Set("client_secret", *clientSecret)

		resp, err := http.Post(tokenURL, "application/x-www-form-urlencoded", strings.NewReader(data.Encode()))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)

			log.Println(err)

			return
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)

			log.Println(err)

			return
		}

		var tokenResp tokenResponse
		if err := json.Unmarshal(body, &tokenResp); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)

			log.Println(err)

			return
		}

		fmt.Println(tokenResp.RefreshToken)

		os.Exit(0)
	})

	log.Println("Open this URL in your web browser:", fmt.Sprintf("%s?client_id=%s&response_type=code&redirect_uri=%s&scope=%s", authURL, *clientID, *redirectURL, scope))

	panic(http.ListenAndServe(":1318", nil))
}
