package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/pojntfx/felicitas.pojtinger.com/api/bluesky"
	"github.com/pojntfx/felicitas.pojtinger.com/api/forges"
	"github.com/pojntfx/felicitas.pojtinger.com/api/mastodon"
	"github.com/pojntfx/felicitas.pojtinger.com/api/spotify"
	"github.com/pojntfx/felicitas.pojtinger.com/api/twitch"
	"github.com/pojntfx/felicitas.pojtinger.com/api/twitter"
	"github.com/pojntfx/felicitas.pojtinger.com/api/youtube"
)

func main() {
	twitchClientID := flag.String("twitch-client-id", "", "Twitch API client ID (can also be set using the TWITCH_CLIENT_ID env variable)")
	twitchClientSecret := flag.String("twitch-client-secret", "", "Twitch API client secret (can also be set using the TWITCH_CLIENT_SECRET env variable)")

	mastodonServer := flag.String("mastodon-server", "", "Mastodon API server (can also be set using the MASTODON_SERVER env variable)")
	mastodonClientID := flag.String("mastodon-client-id", "", "Mastodon API client ID (can also be set using the MASTODON_CLIENT_ID env variable)")
	mastodonClientSecret := flag.String("mastodon-client-secret", "", "Mastodon API client secret (can also be set using the MASTODON_CLIENT_SECRET env variable)")
	mastodonAccessToken := flag.String("mastodon-access-token", "", "Mastodon API access token (can also be set using the MASTODON_ACCESS_TOKEN env variable)")

	blueskyServer := flag.String("bluesky-server", "", "Bluesky API server (can also be set using the BLUESKY_SERVER env variable)")
	blueskyPassword := flag.String("bluesky-password", "", "Bluesky password (can also be set using the BLUESKY_PASSWORD env variable)")

	forgesFile := flag.String("forges", filepath.Join("data", "forges.yaml"), "Forges configuration file (can also be set using the FORGES_FILE env variable)")
	forgeTokens := flag.String("forge-tokens", "", "Forge tokens as JSON object, e.g. {\"github.com\": \"token\"} (can also be set using the FORGE_TOKENS env variable)")

	youtubeToken := flag.String("youtube-token", "", "YouTube API access token (can also be set using the YOUTUBE_TOKEN env variable)")

	spotifyClientID := flag.String("spotify-client-id", "", "Spotify API client ID (can also be set using the SPOTIFY_CLIENT_ID env variable)")
	spotifyClientSecret := flag.String("spotify-client-secret", "", "Spotify API client secret (can also be set using the SPOTIFY_CLIENT_SECRET env variable)")
	spotifyRefreshToken := flag.String("spotify-refresh-token", "", "Spotify API refresh token (can also be set using the SPOTIFY_REFRESH_TOKEN env variable)")

	laddr := flag.String("laddr", "localhost:1314", "Listen address for the API")

	ttl := flag.Int("ttl", 900, "Time in seconds to cache API responses for (can also be set using the TTL env variable)")

	flag.Parse()

	if *twitchClientID == "" {
		*twitchClientID = os.Getenv("TWITCH_CLIENT_ID")
	}

	if *twitchClientSecret == "" {
		*twitchClientSecret = os.Getenv("TWITCH_CLIENT_SECRET")
	}

	if *mastodonServer == "" {
		*mastodonServer = os.Getenv("MASTODON_SERVER")
	}

	if *mastodonClientID == "" {
		*mastodonClientID = os.Getenv("MASTODON_CLIENT_ID")
	}

	if *mastodonClientSecret == "" {
		*mastodonClientSecret = os.Getenv("MASTODON_CLIENT_SECRET")
	}

	if *mastodonAccessToken == "" {
		*mastodonAccessToken = os.Getenv("MASTODON_ACCESS_TOKEN")
	}

	if *blueskyServer == "" {
		*blueskyServer = os.Getenv("BLUESKY_SERVER")
	}

	if *blueskyPassword == "" {
		*blueskyPassword = os.Getenv("BLUESKY_PASSWORD")
	}

	if *forgesFile == "" {
		*forgesFile = os.Getenv("FORGES_FILE")
	}

	if *forgeTokens == "" {
		*forgeTokens = os.Getenv("FORGE_TOKENS")
	}

	forgesYAML, err := os.ReadFile(*forgesFile)
	if err != nil {
		panic(err)
	}

	tokens := map[string]string{}
	if *forgeTokens != "" {
		if err := json.Unmarshal([]byte(*forgeTokens), &tokens); err != nil {
			panic(fmt.Errorf("failed to parse forge tokens: %w", err))
		}
	}

	if *youtubeToken == "" {
		*youtubeToken = os.Getenv("YOUTUBE_TOKEN")
	}

	if *spotifyClientID == "" {
		*spotifyClientID = os.Getenv("SPOTIFY_CLIENT_ID")
	}

	if *spotifyClientSecret == "" {
		*spotifyClientSecret = os.Getenv("SPOTIFY_CLIENT_SECRET")
	}

	if *spotifyRefreshToken == "" {
		*spotifyRefreshToken = os.Getenv("SPOTIFY_REFRESH_TOKEN")
	}

	if rawTTL := os.Getenv("TTL"); rawTTL != "" {
		envTTL, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		*ttl = envTTL
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

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		twitch.TwitchStatusHandler(rw, r, *twitchClientID, *twitchClientSecret)
	})

	mux.HandleFunc("/api/twitter", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Twitter API:", err)

				http.Error(rw, "Error occured in Twitter API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		twitter.Handler(rw, r)
	})

	mux.HandleFunc("/api/mastodon", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Mastodon API:", err)

				http.Error(rw, "Error occured in Mastodon API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		mastodon.MastodonFeedHandler(rw, r, *mastodonServer, *mastodonClientID, *mastodonClientSecret, *mastodonAccessToken)
	})

	mux.HandleFunc("/api/bluesky", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Bluesky API:", err)

				http.Error(rw, "Error occured in Bluesky API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		bluesky.BlueskyFeedHandler(rw, r, *blueskyServer, *blueskyPassword)
	})

	mux.HandleFunc("/api/forges", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in forges API:", err)

				http.Error(rw, "Error occured in forges API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		forges.ForgesHandler(rw, r, forgesYAML, tokens)
	})

	mux.HandleFunc("/api/youtube", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in YouTube API:", err)

				http.Error(rw, "Error occured in YouTube API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		youtube.YouTubeHandler(rw, r, *youtubeToken)
	})

	mux.HandleFunc("/api/spotify", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Spotify API:", err)

				http.Error(rw, "Error occured in Spotify API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		spotify.SpotifyStatusHandler(rw, r, *spotifyClientID, *spotifyClientSecret, *spotifyRefreshToken)
	})

	log.Println("API listening on", *laddr)

	panic(http.ListenAndServe(*laddr, mux))
}
