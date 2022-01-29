package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/pojntfx/personal-site/api/github"
	"github.com/pojntfx/personal-site/api/twitch"
	"github.com/pojntfx/personal-site/api/twitter"
	"github.com/pojntfx/personal-site/api/youtube"
)

func main() {
	twitchClientID := flag.String("twitch-client-id", "", "Twitch API client ID (can also be set using the TWITCH_CLIENT_ID env variable)")
	twitchClientSecret := flag.String("twitch-client-secret", "", "Twitch API client secret (can also be set using the TWITCH_CLIENT_SECRET env variable)")
	twitchUsername := flag.String("twitch-username", "", "Twitch username to get status for (can also be set using the TWITCH_USERNAME env variable)")

	twitterClientID := flag.String("twitter-client-id", "", "Twitter API client ID (can also be set using the TWITTER_CLIENT_ID env variable)")
	twitterClientSecret := flag.String("twitter-client-secret", "", "Twitter API client secret (can also be set using the TWITTER_CLIENT_SECRET env variable)")
	twitterUsername := flag.String("twitter-username", "", "Twitter username to get feed for (can also be set using the TWITTER_USERNAME env variable)")

	githubAPI := flag.String("github-api", "", "GitHub/Gitea API endpoint to use (can also be set using the GITHUB_API env variable)")
	githubToken := flag.String("github-token", "", "GitHub/Gitea API access token (can also be set using the GITHUB_TOKEN env variable)")
	githubUsername := flag.String("github-username", "", "Github username to get info for (can also be set using the GITHUB_USERNAME env variable)")

	youtubeToken := flag.String("youtube-token", "", "YouTube API access token (can also be set using the YOUTUBE_TOKEN env variable)")
	youtubeChannelID := flag.String("youtube-channel-id", "", "YouTube channel ID to get info for (can also be set using the YOUTUBE_CHANNEL_ID env variable)")

	laddr := flag.String("laddr", "localhost:1314", "Listen address for the API")

	ttl := flag.Int("ttl", 900, "Time in seconds to cache API responses for (can also be set using the TTL env variable)")

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

	if *twitterClientID == "" {
		*twitterClientID = os.Getenv("TWITTER_CLIENT_ID")
	}

	if *twitterClientSecret == "" {
		*twitterClientSecret = os.Getenv("TWITTER_CLIENT_SECRET")
	}

	if *twitterUsername == "" {
		*twitterUsername = os.Getenv("TWITTER_USERNAME")
	}

	if *githubAPI == "" {
		*githubAPI = os.Getenv("GITHUB_API")
	}

	if *githubToken == "" {
		*githubToken = os.Getenv("GITHUB_TOKEN")
	}

	if *githubUsername == "" {
		*githubUsername = os.Getenv("GITHUB_USERNAME")
	}

	if *youtubeToken == "" {
		*youtubeToken = os.Getenv("YOUTUBE_TOKEN")
	}

	if *youtubeChannelID == "" {
		*youtubeChannelID = os.Getenv("YOUTUBE_CHANNEL_ID")
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

		twitch.TwitchStatusHandler(rw, r, *twitchClientID, *twitchClientSecret, *twitchUsername)
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

		twitter.TwitterFeedHandler(rw, r, *twitterClientID, *twitterClientSecret, *twitterUsername)
	})

	mux.HandleFunc("/api/github", func(rw http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("Error occured in GitHub API:", err)

				http.Error(rw, "Error occured in GitHub API", http.StatusInternalServerError)

				return
			}
		}()

		rw.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", *ttl))

		github.GitHubHandler(rw, r, *githubAPI, *githubToken, *githubUsername)
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

		youtube.YouTubeHandler(rw, r, *youtubeToken, *youtubeChannelID)
	})

	log.Println("API listening on", *laddr)

	panic(http.ListenAndServe(*laddr, mux))
}
