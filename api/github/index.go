package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"
	"time"

	"github.com/google/go-github/v42/github"
	"golang.org/x/oauth2"
)

const (
	typePushEvent = "PushEvent"
)

type Output struct {
	UserName          string `json:"username"`
	UserFollowerCount int    `json:"userFollowerCount"`

	LastCommitTime    string `json:"lastCommitTime"`
	LastCommitRepo    string `json:"lastCommitRepo"`
	LastCommitMessage string `json:"lastCommitMessage"`
	LastCommitURL     string `json:"lastCommitURL"`
}

func GitHubHandler(w http.ResponseWriter, r *http.Request, api string, token string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

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
		UserName:          user.GetLogin(),
		UserFollowerCount: user.GetFollowers(),
	}

	var event *github.Event
	for _, candidate := range events {
		if candidate.GetType() == typePushEvent {
			event = candidate

			break
		}
	}

	if event != nil {
		output.LastCommitTime = event.GetCreatedAt().Format(time.RFC3339)

		repo := event.GetRepo()
		if repo != nil {
			output.LastCommitRepo = repo.GetName()
		}

		var pushEvent github.PushEvent
		if err := json.Unmarshal(event.GetRawPayload(), &pushEvent); err != nil {
			panic(err)
		}

		if len(pushEvent.Commits) > 0 {
			owner, repo := path.Split(repo.GetName())

			commit, _, err := client.Repositories.GetCommit(r.Context(), strings.TrimSuffix(owner, "/"), repo, pushEvent.Commits[0].GetSHA(), nil)
			if err != nil {
				panic(err)
			}

			output.LastCommitURL = commit.GetHTMLURL()

			if commit.Commit != nil {
				output.LastCommitMessage = commit.Commit.GetMessage()
			}
		}
	}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	GitHubHandler(w, r, os.Getenv("GITHUB_API"), os.Getenv("GITHUB_TOKEN"))
}
