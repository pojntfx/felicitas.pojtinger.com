package main

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"golang.org/x/oauth2"
)

var (
	errClientIDEmpty     = errors.New("missing client ID")
	errClientSecretEmpty = errors.New("missing client secret")
	errRefreshTokenEmpty = errors.New("missing refresh token")
)

type SpotifyCurrentlyPlaying struct {
	Name    string `json:"name"`
	Artists []struct {
		Name string `json:"name"`
	} `json:"artists"`
	ExternalUrls struct {
		Spotify string `json:"spotify"`
	} `json:"external_urls"`
}

func main() {
	clientID := flag.String("client-id", "", "Client ID to use")
	clientSecret := flag.String("client-secret", "", "Client secret to use")
	refreshToken := flag.String("refresh-token", "", "Refresh token to use")

	flag.Parse()

	if strings.TrimSpace(*clientID) == "" {
		panic(errClientIDEmpty)
	}

	if strings.TrimSpace(*clientSecret) == "" {
		panic(errClientSecretEmpty)
	}

	if strings.TrimSpace(*refreshToken) == "" {
		panic(errRefreshTokenEmpty)
	}

	conf := &oauth2.Config{
		ClientID:     *clientID,
		ClientSecret: *clientSecret,
		Endpoint: oauth2.Endpoint{
			TokenURL: "https://accounts.spotify.com/api/token",
		},
		Scopes: []string{"user-read-playback-state", "user-read-currently-playing"},
	}

	token, err := conf.TokenSource(context.Background(), &oauth2.Token{
		RefreshToken: *refreshToken,
	}).Token()
	if err != nil {
		panic("Error obtaining access token from refresh token: " + err.Error())
	}

	client := conf.Client(context.Background(), token)

	req, err := http.NewRequest("GET", "https://api.spotify.com/v1/me/player/currently-playing", nil)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		panic("Couldn't get current playing song: status code " + fmt.Sprintf("%d", resp.StatusCode))
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	var playing struct {
		IsPlaying bool                    `json:"is_playing"`
		Item      SpotifyCurrentlyPlaying `json:"item"`
	}
	err = json.Unmarshal(body, &playing)
	if err != nil {
		panic(err)
	}

	if playing.IsPlaying {
		fmt.Printf("Song: %s\n", playing.Item.Name)
		fmt.Printf("Artist: %s\n", playing.Item.Artists[0].Name)
		fmt.Printf("Link: %s\n", playing.Item.ExternalUrls.Spotify)
	} else {
		fmt.Println("Not currently playing any song.")
	}
}
