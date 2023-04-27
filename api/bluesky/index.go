package bluesky

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path"

	"github.com/pojntfx/skytheon/pkg/backends"
)

type Output struct {
	UserDisplayName       string `json:"userDisplayName"`
	UserName              string `json:"username"`
	UserFollowerCount     int    `json:"userFollowerCount"`
	UserURL               string `json:"userURL"`
	UserProfilePictureURL string `json:"userProfilePictureURL"`
	UserID                string `json:"userID"`

	Posts []Post `json:"posts"`
}

type Post struct {
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

var (
	blueskyBaseURL = "https://staging.bsky.app/"
)

func BlueskyFeedHandler(w http.ResponseWriter, r *http.Request, server string, appPassword string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

	client := backends.NewBluesky(server)

	did, err := client.GetDID(username)
	if err != nil {
		panic(err)
	}

	accessToken, err := client.GetAccessToken(appPassword, did)
	if err != nil {
		panic(err)
	}

	profile, err := client.GetProfile(accessToken, did)
	if err != nil {
		panic(err)
	}

	sourcePosts, err := client.GetPosts(accessToken, did, 100)
	if err != nil {
		panic(err)
	}

	output := Output{}

	output.UserDisplayName = profile.DisplayName
	output.UserName = profile.Handle
	output.UserFollowerCount = profile.Followers
	output.UserURL = blueskyBaseURL + "profile/" + profile.Handle
	output.UserProfilePictureURL = profile.Avatar
	output.UserID = did

	posts := []Post{}

	for i, sourcePost := range sourcePosts {
		if i >= 4 {
			continue
		}

		post := Post{}

		post.Timestamp = sourcePost.CreatedAt
		post.Body = sourcePost.Text

		images := []Media{}

		for _, attachment := range sourcePost.Images {
			images = append(images, Media{
				URL:     attachment.URL,
				AltText: attachment.AltText,
				IsVideo: false,
			})
		}

		post.Media = images

		post.RepliesCount = sourcePost.ReplyCount
		post.ReblogsCount = sourcePost.RepostCount
		post.FavoritesCount = sourcePost.LikeCount

		post.URL = blueskyBaseURL + "profile/" + profile.Handle + "/post/" + path.Base(sourcePost.URI)

		posts = append(posts, post)
	}

	output.Posts = posts

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	BlueskyFeedHandler(w, r, os.Getenv("BLUESKY_SERVER"), os.Getenv("BLUESKY_PASSWORD"))
}
