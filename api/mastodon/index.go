package mastodon

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/mattn/go-mastodon"
)

type Output struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserFollowerCount     int    `json:"userFollowerCount"`
	UserURL               string `json:"userURL"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`
	UserID                string `json:"userID"`

	Toots []Toot `json:"toots"`
}

type Toot struct {
	Timestamp string `json:"timestamp"`
	Body      string `json:"body"`

	Media []Media `json:"media"`

	RepliesCount   int `json:"repliesCount"`
	ReblogsCount   int `json:"reblogsCount"`
	FavoritesCount int `json:"favoritesCount"`

	URL string `json:"url"`
}

type Media struct {
	URL     string `json:"url"`
	AltText string `json:"altText"`
	IsVideo bool   `json:"isVideo"`
}

func MastodonFeedHandler(w http.ResponseWriter, r *http.Request, server string, clientID string, clientSecret string, accessToken string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

	client := mastodon.NewClient(&mastodon.Config{
		Server:       server,
		ClientID:     clientID,
		ClientSecret: clientSecret,
		AccessToken:  accessToken,
	})

	output := Output{}

	accounts, err := client.AccountsSearch(r.Context(), username, 1)
	if err != nil {
		panic(err)
	}

	if len(accounts) != 1 {
		w.WriteHeader(http.StatusNotFound)

		panic(http.StatusNotFound)
	}

	account, err := client.GetAccount(r.Context(), accounts[0].ID)
	if err != nil {
		panic(err)
	}

	output.UserDisplayName = account.DisplayName
	output.UserName = account.Username
	output.UserFollowerCount = int(account.FollowersCount)
	output.UserURL = account.URL
	output.UserProfilePictureURL = account.AvatarStatic
	output.UserID = string(account.ID)

	toots := []Toot{}

	sourceToots, err := client.GetAccountStatuses(r.Context(), account.ID, &mastodon.Pagination{
		Limit: 5,
	})
	if err != nil {
		panic(err)
	}

	for _, sourceToot := range sourceToots {
		toot := Toot{}

		toot.Timestamp = sourceToot.CreatedAt.Format(time.RFC3339)
		toot.Body = sourceToot.Content

		images := []Media{}

		for _, attachment := range sourceToot.MediaAttachments {
			images = append(images, Media{
				URL:     attachment.URL,
				AltText: attachment.Description,
				IsVideo: attachment.Type == "video",
			})
		}

		toot.Media = images

		toot.RepliesCount = int(sourceToot.RepliesCount)
		toot.ReblogsCount = int(sourceToot.ReblogsCount)
		toot.FavoritesCount = int(sourceToot.FavouritesCount)

		toot.URL = sourceToot.URL

		toots = append(toots, toot)
	}

	output.Toots = toots

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	MastodonFeedHandler(w, r, os.Getenv("MASTODON_SERVER"), os.Getenv("MASTODON_CLIENT_ID"), os.Getenv("MASTODON_CLIENT_SECRET"), os.Getenv("MASTODON_ACCESS_TOKEN"))
}
