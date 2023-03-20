package twitter

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/mmcdole/gofeed"
)

type Output struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserURL               string `json:"userURL"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`

	Tweets []Tweet `json:"tweets"`
}

type Tweet struct {
	Timestamp string `json:"timestamp"`
	Body      string `json:"body"`

	URL string `json:"url"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

	parser := gofeed.NewParser()

	u, err := url.Parse("https://nitter.net/")
	if err != nil {
		panic(err)
	}
	u.Path = path.Join(u.Path, username, "rss")

	feed, err := parser.ParseURL(u.String())
	if err != nil {
		panic(err)
	}

	names := strings.Split(feed.Title, " / ")

	output := Output{}

	output.UserDisplayName = names[0]
	output.UserName = strings.TrimPrefix(names[1], "@")
	output.UserURL = feed.Link
	output.UserProfilePictureURL = feed.Image.URL

	tweets := []Tweet{}

	count := 0
	for _, sourceTweet := range feed.Items {
		if strings.HasPrefix(sourceTweet.Title, "R to "+names[1]) || strings.HasPrefix(sourceTweet.Title, "QT by") || strings.HasPrefix(sourceTweet.Title, "RT by") {
			continue
		}

		if count >= 4 {
			break
		}

		count++

		tweet := Tweet{}

		createdAt, err := time.Parse(time.RFC1123, sourceTweet.Published)
		if err != nil {
			panic(err)
		}

		tweet.Timestamp = createdAt.Format(time.RFC3339)
		tweet.Body = sourceTweet.Description

		tweet.URL = sourceTweet.Link

		tweets = append(tweets, tweet)
	}

	output.Tweets = tweets

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func TwitterFeedHandler(w http.ResponseWriter, r *http.Request) {
	Handler(w, r)
}
