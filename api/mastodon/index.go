package mastodon

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
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

	Author    Author  `json:"author"`
	BoostedBy *Author `json:"boostedBy,omitempty"`
}

type Author struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserURL               string `json:"userUrl"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`
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

	includeReblogs := r.URL.Query().Has("includeReblogs")

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

	feedAuthor := Author{
		UserDisplayName:       account.DisplayName,
		UserName:              account.Username,
		UserURL:               account.URL,
		UserProfilePictureURL: account.AvatarStatic,
	}

	const wantToots = 4

	for sourceToot, err := range client.AccountStatuses(
		r.Context(),
		account.ID,
		&mastodon.Pagination{
			Limit: wantToots,
		},
	) {
		if err != nil {
			panic(err)
		}

		// Hide any non-public toots
		// See https://docs.joinmastodon.org/entities/Status/#visibility
		if sourceToot.Visibility != "public" {
			continue
		}

		toot := Toot{}

		contentSource := sourceToot
		toot.Author = feedAuthor

		if sourceToot.Reblog != nil {
			if !includeReblogs {
				continue
			}

			contentSource = sourceToot.Reblog
			toot.Author = Author{
				UserDisplayName:       sourceToot.Reblog.Account.DisplayName,
				UserName:              sourceToot.Reblog.Account.Username,
				UserURL:               sourceToot.Reblog.Account.URL,
				UserProfilePictureURL: sourceToot.Reblog.Account.AvatarStatic,
			}
			boostedBy := feedAuthor
			toot.BoostedBy = &boostedBy
		} else if strings.TrimSpace(sourceToot.Content) == "" && len(sourceToot.MediaAttachments) <= 0 {
			// Skip empty toots
			continue
		}

		toot.Timestamp = sourceToot.CreatedAt.Format(time.RFC3339)
		toot.Body = contentSource.Content

		images := []Media{}

		for _, attachment := range contentSource.MediaAttachments {
			images = append(images, Media{
				URL:     attachment.URL,
				AltText: attachment.Description,
				IsVideo: attachment.Type == "video",
			})
		}

		toot.Media = images

		toot.RepliesCount = int(contentSource.RepliesCount)
		toot.ReblogsCount = int(contentSource.ReblogsCount)
		toot.FavoritesCount = int(contentSource.FavouritesCount)

		toot.URL = contentSource.URL

		toots = append(toots, toot)

		if len(toots) >= wantToots {
			break
		}
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
