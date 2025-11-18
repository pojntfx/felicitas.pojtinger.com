package github

import (
	"encoding/json"
	"errors"
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
	UserURL           string `json:"userURL"`

	LastCommitTime     string `json:"lastCommitTime"`
	LastCommitRepoName string `json:"lastCommitRepoName"`
	LastCommitRepoURL  string `json:"lastCommitRepoURL"`
	LastCommitMessage  string `json:"lastCommitMessage"`
	LastCommitURL      string `json:"lastCommitURL"`
}

var (
	errInvalidPushEvent = errors.New("invalid push event")
)

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
		UserURL:           user.GetHTMLURL(),
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

		owner, repoName := path.Split(event.GetRepo().GetName())
		owner = strings.TrimSuffix(owner, "/")

		repo, _, err := client.Repositories.Get(r.Context(), owner, repoName)
		if err != nil {
			panic(err)
		}

		if repo != nil {
			output.LastCommitRepoName = repo.GetFullName()
			output.LastCommitRepoURL = repo.GetHTMLURL()
		}

		rawPayload, err := event.ParsePayload()
		if err != nil {
			panic(err)
		}

		pushEvent, ok := rawPayload.(*github.PushEvent)
		if !ok {
			panic(errInvalidPushEvent)
		}

		if pushEvent.Head != nil {
			commit, _, err := client.Repositories.GetCommit(r.Context(), owner, repoName, pushEvent.GetHead(), nil)
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
