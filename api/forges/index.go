package forges

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"sort"
	"strings"
	"time"

	"codeberg.org/mvdkleijn/forgejo-sdk/forgejo"
	"github.com/google/go-github/v42/github"
	"golang.org/x/oauth2"
	"gopkg.in/yaml.v3"
)

const (
	typePushEvent = "PushEvent"
)

var (
	errNoActivityFoundFromAnyForge = errors.New("no activity found from any forge")
)

type ForgeType string

const (
	ForgeTypeGitHub  ForgeType = "github"
	ForgeTypeForgejo ForgeType = "forgejo"
)

type ForgeConfig struct {
	Domain   string    `yaml:"domain"`
	Type     ForgeType `yaml:"type"`
	API      string    `yaml:"api"`
	CDN      string    `yaml:"cdn"`
	Icon     string    `yaml:"icon"`
	Name     string    `yaml:"name"`
	Shield   string    `yaml:"shield"`
	Username string    `yaml:"username"`
}

type Output struct {
	UserName          string `json:"username"`
	UserFollowerCount int    `json:"userFollowerCount"`
	UserURL           string `json:"userURL"`

	LastCommitTime     string `json:"lastCommitTime"`
	LastCommitRepoName string `json:"lastCommitRepoName"`
	LastCommitRepoURL  string `json:"lastCommitRepoURL"`
	LastCommitMessage  string `json:"lastCommitMessage"`
	LastCommitURL      string `json:"lastCommitURL"`

	ForgeIcon   string `json:"forgeIcon"`
	ForgeDomain string `json:"forgeDomain"`
	ForgeName   string `json:"forgeName"`
	ForgeShield string `json:"forgeShield"`
}

func ForgesHandler(w http.ResponseWriter, r *http.Request, forgesYAML []byte, tokens map[string]string) {
	var forgesList []ForgeConfig
	if err := yaml.Unmarshal(forgesYAML, &forgesList); err != nil {
		panic(err)
	}

	var results []Output

	for _, forge := range forgesList {
		if forge.Username == "" {
			continue
		}

		token := tokens[forge.Domain]

		var output Output
		var err error

		switch forge.Type {
		case ForgeTypeGitHub:
			output, err = fetchGitHubActivity(r, forge, token)
		case ForgeTypeForgejo:
			output, err = fetchForgejoActivity(r, forge, token)
		}

		if err != nil {
			panic(err)
		}

		output.ForgeIcon = forge.Icon
		output.ForgeDomain = forge.Domain
		output.ForgeName = forge.Name
		output.ForgeShield = forge.Shield
		results = append(results, output)
	}

	if len(results) == 0 {
		panic(errNoActivityFoundFromAnyForge)
	}

	sort.Slice(results, func(i, j int) bool {
		ti, err := time.Parse(time.RFC3339, results[i].LastCommitTime)
		if err != nil {
			panic(err)
		}

		tj, err := time.Parse(time.RFC3339, results[j].LastCommitTime)
		if err != nil {
			panic(err)
		}

		return ti.After(tj)
	})

	j, err := json.Marshal(results[0])
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func fetchGitHubActivity(r *http.Request, forge ForgeConfig, token string) (Output, error) {
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
	client.BaseURL, err = url.Parse(forge.API)
	if err != nil {
		return Output{}, err
	}

	user, _, err := client.Users.Get(r.Context(), forge.Username)
	if err != nil {
		return Output{}, err
	}

	events, _, err := client.Activity.ListEventsPerformedByUser(r.Context(), forge.Username, true, nil)
	if err != nil {
		return Output{}, err
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
			return Output{}, err
		}

		if repo != nil {
			output.LastCommitRepoName = repo.GetFullName()
			output.LastCommitRepoURL = repo.GetHTMLURL()
		}

		rawPayload, err := event.ParsePayload()
		if err != nil {
			return Output{}, err
		}

		pushEvent, ok := rawPayload.(*github.PushEvent)
		if !ok {
			return Output{}, fmt.Errorf("invalid push event")
		}

		if pushEvent.Head != nil {
			commit, _, err := client.Repositories.GetCommit(r.Context(), owner, repoName, pushEvent.GetHead(), nil)
			if err != nil {
				return Output{}, err
			}

			output.LastCommitURL = commit.GetHTMLURL()

			if commit.Commit != nil {
				output.LastCommitMessage = commit.Commit.GetMessage()
			}
		}
	}

	return output, nil
}

func fetchForgejoActivity(r *http.Request, forge ForgeConfig, token string) (Output, error) {
	options := []forgejo.ClientOption{
		forgejo.SetContext(r.Context()),
	}
	if token != "" {
		options = append(options, forgejo.SetToken(token))
	}

	client, err := forgejo.NewClient(forge.API, options...)
	if err != nil {
		return Output{}, err
	}

	user, _, err := client.GetUserInfo(forge.Username)
	if err != nil {
		return Output{}, err
	}

	output := Output{
		UserName:          user.UserName,
		UserFollowerCount: user.FollowerCount,
		UserURL:           fmt.Sprintf("%s%s", forge.API, user.UserName),
	}

	repos, _, err := client.ListUserRepos(forge.Username, forgejo.ListReposOptions{})
	if err != nil {
		return Output{}, err
	}

	if len(repos) > 0 {
		sort.Slice(repos, func(i, j int) bool {
			return repos[i].Updated.After(repos[j].Updated)
		})

		mostRecentRepo := repos[0]

		commits, _, err := client.ListRepoCommits(mostRecentRepo.Owner.UserName, mostRecentRepo.Name, forgejo.ListCommitOptions{
			ListOptions: forgejo.ListOptions{
				PageSize: 1,
			},
		})
		if err != nil {
			return Output{}, err
		}

		if len(commits) > 0 {
			commit := commits[0]
			output.LastCommitTime = commit.CommitMeta.Created.Format(time.RFC3339)
			output.LastCommitRepoName = mostRecentRepo.FullName
			output.LastCommitRepoURL = mostRecentRepo.HTMLURL
			output.LastCommitMessage = commit.RepoCommit.Message
			output.LastCommitURL = commit.HTMLURL
		}
	}

	return output, nil
}
