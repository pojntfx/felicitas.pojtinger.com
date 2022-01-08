package twitter

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dghubble/go-twitter/twitter"
	"golang.org/x/oauth2/clientcredentials"
)

func TwitterFeedHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string, username string) {
	config := &clientcredentials.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		TokenURL:     "https://api.twitter.com/oauth2/token",
	}
	httpClient := config.Client(context.Background())

	client := twitter.NewClient(httpClient)

	tweets, _, err := client.Timelines.UserTimeline(&twitter.UserTimelineParams{
		ScreenName: username,
		Count:      5,
	})
	if err != nil {
		panic(err)
	}

	j, err := json.Marshal(tweets)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	TwitterFeedHandler(w, r, os.Getenv("TWITTER_CLIENT_ID"), os.Getenv("TWITTER_CLIENT_SECRET"), os.Getenv("TWITTER_USERNAME"))
}
