package spotify

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"golang.org/x/oauth2"
)

type Output struct {
	Song   string `json:"Song"`
	Artist string `json:"Artist"`
	Link   string `json:"Link"`
}

type spotifyCurrentlyPlaying struct {
	Name    string `json:"name"`
	Artists []struct {
		Name string `json:"name"`
	} `json:"artists"`
	ExternalUrls struct {
		Spotify string `json:"spotify"`
	} `json:"external_urls"`
}

var (
	errClientIDEmpty     = errors.New("missing client ID")
	errClientSecretEmpty = errors.New("missing client secret")
	errRefreshTokenEmpty = errors.New("missing refresh token")
)

func SpotifyStatusHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string, refreshToken string) {
	if strings.TrimSpace(clientID) == "" {
		panic(errClientIDEmpty)
	}

	if strings.TrimSpace(clientSecret) == "" {
		panic(errClientSecretEmpty)
	}

	if strings.TrimSpace(refreshToken) == "" {
		panic(errRefreshTokenEmpty)
	}

	conf := &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint: oauth2.Endpoint{
			TokenURL: "https://accounts.spotify.com/api/token",
		},
		Scopes: []string{"user-read-playback-state", "user-read-currently-playing"},
	}

	token, err := conf.TokenSource(context.Background(), &oauth2.Token{
		RefreshToken: refreshToken,
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
		Item      spotifyCurrentlyPlaying `json:"item"`
	}
	if err := json.Unmarshal(body, &playing); err != nil {
		panic(err)
	}

	output := Output{}
	if playing.IsPlaying {
		output.Song = playing.Item.Name
		if len(playing.Item.Artists) > 0 {
			output.Artist = playing.Item.Artists[0].Name
		}
		output.Link = playing.Item.ExternalUrls.Spotify
	}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	SpotifyStatusHandler(w, r, os.Getenv("SPOTIFY_CLIENT_ID"), os.Getenv("SPOTIFY_CLIENT_SECRET"), os.Getenv("SPOTIFY_REFRESH_TOKEN"))
}
