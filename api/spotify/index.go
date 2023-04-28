package spotify

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
)

type Output struct {
}

func SpotifyStatusHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

	spotify.New(spotifyauth.New().Client(r.Context()))

	output := Output{}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	SpotifyStatusHandler(w, r, os.Getenv("SPOTIFY_CLIENT_ID"), os.Getenv("SPOTIFY_CLIENT_SECRET"))
}
