package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"time"

	"github.com/google/go-github/v42/github"
	"golang.org/x/oauth2"
)

const (
	typePushEvent = "PushEvent"
)

type Output struct {
	UserName      string `json:"username"`
	UserFollowers int    `json:"userFollowers"`

	LastCommitTime    string `json:"lastCommitTime"`
	LastCommitRepo    string `json:"lastCommitRepo"`
	LastCommitMessage string `json:"lastCommitMessage"`
}

func GitHubHandler(w http.ResponseWriter, r *http.Request, api string, token string, username string, ttl int) {
	var httpClient *http.Client
	if token != "" {
		httpClient = oauth2.NewClient(
			r.Context(),
			oauth2.StaticTokenSource(
				&oauth2.Token{
					AccessToken: token,
				},
			),
		)
	}

	client := github.NewClient(httpClient)

	var err error
	client.BaseURL, err = url.Parse(api)
	if err != nil {
		panic(err)
	}

	user, _, err := client.Users.Get(r.Context(), username)
	if err != nil {
		panic(err)
	}

	events, _, err := client.Activity.ListEventsPerformedByUser(r.Context(), username, true, nil)
	if err != nil {
		panic(err)
	}

	output := Output{
		UserName:      *user.Login,
		UserFollowers: *user.Followers,
	}

	var event *github.Event
	for _, candidate := range events {
		if *candidate.Type == typePushEvent {
			event = candidate

			break
		}
	}

	if event != nil {
		output.LastCommitTime = event.CreatedAt.Format(time.RFC3339)

		repo := event.GetRepo()
		if repo != nil {
			output.LastCommitRepo = *repo.Name
		}

		var pushEvent github.PushEvent
		if err := json.Unmarshal(event.GetRawPayload(), &pushEvent); err != nil {
			panic(err)
		}

		if len(pushEvent.Commits) > 0 {
			output.LastCommitMessage = *pushEvent.Commits[0].Message
		}
	}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	w.Header().Add("Cache-Control", fmt.Sprintf("s-maxage=%v", ttl))

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ttl := 900
	if rawTTL := os.Getenv("GITHUB_TTL"); rawTTL != "" {
		parsedTTL, err := strconv.Atoi(rawTTL)
		if err != nil {
			panic(err)
		}

		ttl = parsedTTL
	}

	GitHubHandler(w, r, os.Getenv("GITHUB_API"), os.Getenv("GITHUB_TOKEN"), os.Getenv("GITHUB_USERNAME"), ttl)
}
