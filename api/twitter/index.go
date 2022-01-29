package twitter

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dghubble/go-twitter/twitter"
	"golang.org/x/oauth2/clientcredentials"
)

type Output struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserFollowerCount     int    `json:"userFollowerCount"`
	UserProfileURL        string `json:"userProfileURL"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`

	Tweets []Tweet `json:"tweets"`
}

type Tweet struct {
	Timestamp string `json:"timestamp"`
	Body      string `json:"body"`

	Images []Image `json:"images"`

	CommentCount int `json:"commentCount"`
	RetweetCount int `json:"retweetCount"`
	LikeCount    int `json:"likeCount"`

	URL string `json:"url"`
}

type Image struct {
	URL     string `json:"url"`
	AltText string `json:"altText"`
}

const (
	userProfileURLPrefix = "https://twitter.com/"
)

func TwitterFeedHandler(w http.ResponseWriter, r *http.Request, clientID string, clientSecret string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))
		w.WriteHeader(400)

		panic("missing username query parameter")
	}

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
		ScreenName:     username,
		ExcludeReplies: twitter.Bool(true),
		TweetMode:      "extended",
	})
	if err != nil {
		panic(err)
	}

	for _, sourceTweet := range sourceTweets {
		tweet := Tweet{}

		createdAt, err := sourceTweet.CreatedAtTime()
		if err != nil {
			panic(err)
		}

		tweet.Timestamp = createdAt.Format(time.RFC3339)
		tweet.Body = sourceTweet.FullText

		images := []Image{}

		if attachments := sourceTweet.Entities; attachments != nil {
			for _, media := range attachments.Media {
				images = append(images, Image{
					URL:     media.MediaURLHttps,
					AltText: "No alt text available in the Twitter V1 API, please visit the original Tweet URL instead",
				})
			}
		}

		tweet.Images = images

		tweet.CommentCount = sourceTweet.ReplyCount
		tweet.RetweetCount = sourceTweet.RetweetCount
		tweet.LikeCount = sourceTweet.FavoriteCount

		textParts := strings.Split(sourceTweet.FullText, " ")
		if len(textParts) > 0 {
			tweet.URL = textParts[len(textParts)-1]
		} else {
			tweet.URL = textParts[0]
		}

		tweets = append(tweets, tweet)
	}

	output.Tweets = tweets

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	TwitterFeedHandler(w, r, os.Getenv("TWITTER_CLIENT_ID"), os.Getenv("TWITTER_CLIENT_SECRET"))
}
