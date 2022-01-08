package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/pojntfx/personal-site/api/twitch"
	"github.com/pojntfx/personal-site/api/twitter"
)

func main() {
	twitchClientID := flag.String("twitch-client-id", "", "Twitch API client ID (can also be set using the TWITCH_CLIENT_ID env variable)")
	twitchClientSecret := flag.String("twitch-client-secret", "", "Twitch API client secret (can also be set using the TWITCH_CLIENT_SECRET env variable)")
	twitchUsername := flag.String("twitch-username", "", "Twitch username to get status for (can also be set using the TWITCH_USERNAME env variable)")
	twitchTTL := flag.Int("twitch-ttl", 900, "Time in seconds to cache Twitch API responses for (can also be set using the TWITCH_TTL env variable)")

	twitterClientID := flag.String("twitter-client-id", "", "Twitter API client ID (can also be set using the TWITTER_CLIENT_ID env variable)")
	twitterClientSecret := flag.String("twitter-client-secret", "", "Twitter API client secret (can also be set using the TWITTER_CLIENT_SECRET env variable)")
	twitterUsername := flag.String("twitter-username", "", "Twitter username to get feed for (can also be set using the TWITTER_USERNAME env variable)")
	twitterTTL := flag.Int("twitter-ttl", 900, "Time in seconds to cache Twitter API responses for (can also be set using the TWITTER_TTL env variable)")

	laddr := flag.String("laddr", "localhost:1314", "Listen address for the API")

	flag.Parse()

	if *twitchClientID == "" {
		*twitchClientID = os.Getenv("TWITCH_CLIENT_ID")
	}

	if *twitchClientSecret == "" {
		*twitchClientSecret = os.Getenv("TWITCH_CLIENT_SECRET")
	}

	if *twitchUsername == "" {
		*twitchUsername = os.Getenv("TWITCH_USERNAME")
	}

	if rawTTL := os.Getenv("TWITCH_TTL"); rawTTL != "" {
		ttl, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		*twitchTTL = ttl
	}

	if *twitterClientID == "" {
		*twitterClientID = os.Getenv("TWITTER_CLIENT_ID")
	}

	if *twitterClientSecret == "" {
		*twitterClientSecret = os.Getenv("TWITTER_CLIENT_SECRET")
	}

	if *twitterUsername == "" {
		*twitterUsername = os.Getenv("TWITTER_USERNAME")
	}

	if rawTTL := os.Getenv("TWITTER_TTL"); rawTTL != "" {
		ttl, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		*twitterTTL = ttl
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

		twitch.TwitchStatusHandler(rw, r, *twitchClientID, *twitchClientSecret, *twitchUsername, *twitchTTL)
	})

	mux.HandleFunc("/api/twitter", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in Twitter API:", err)

				http.Error(rw, "Error occured in Twitter API", http.StatusInternalServerError)

				return
			}
		}()

		twitter.TwitterFeedHandler(rw, r, *twitterClientID, *twitterClientSecret, *twitterUsername, *twitterTTL)
	})

	log.Println("API listening on", *laddr)

	panic(http.ListenAndServe(*laddr, mux))
}
