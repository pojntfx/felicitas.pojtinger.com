package twitter

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/dghubble/go-twitter/twitter"
	"golang.org/x/oauth2/clientcredentials"
)

type Output struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserFollowerCount     int    `json:"userFollowerCount"`
	UserProfileURL        string `json:"userProfileURL"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`

	Tweets []Tweet
}

type Tweet struct {
}

const (
	userProfileURLPrefix = "https://twitter.com/"
)

func TwitterFeedHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string, username string, ttl int) {
	config := &clientcredentials.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		TokenURL:     "https://api.twitter.com/oauth2/token",
	}
	httpClient := config.Client(r.Context())

	client := twitter.NewClient(httpClient)

	output := Output{}

	user, _, err := client.Users.Show(&twitter.UserShowParams{
		ScreenName: username,
	})
	if err != nil {
		panic(err)
	}

	output.UserDisplayName = user.Name
	output.UserName = user.ScreenName
	output.UserFollowerCount = user.FollowersCount
	output.UserProfileURL = userProfileURLPrefix + user.ScreenName
	output.UserProfilePictureURL = user.ProfileImageURLHttps

	tweets := []Tweet{}

	sourceTweets, _, err := client.Timelines.UserTimeline(&twitter.UserTimelineParams{
		ScreenName:      username,
		Count:           5,
		IncludeRetweets: twitter.Bool(false),
		ExcludeReplies:  twitter.Bool(true),
	})
	if err != nil {
		panic(err)
	}

	for _, tweet := range sourceTweets {
		log.Println(tweet)
	}

	output.Tweets = tweets

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	w.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", ttl))

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ttl := 900
	if rawTTL := os.Getenv("TWITTER_TTL"); rawTTL != "" {
		parsedTTL, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		ttl = parsedTTL
	}

	TwitterFeedHandler(w, r, os.Getenv("TWITTER_CLIENT_ID"), os.Getenv("TWITTER_CLIENT_SECRET"), os.Getenv("TWITTER_USERNAME"), ttl)
}
