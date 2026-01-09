package forgejo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sort"

	"codeberg.org/mvdkleijn/forgejo-sdk/forgejo"
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

func ForgejoHandler(w http.ResponseWriter, r *http.Request, api string, token string) {
	username := r.URL.Query().Get("username")
	if username == "" {
		w.Write([]byte("missing username query parameter: "))

		panic("missing username query parameter")
	}

	options := []forgejo.ClientOption{
		forgejo.SetContext(r.Context()),
	}
	if token != "" {
		options = append(options, forgejo.SetToken(token))
	}

	client, err := forgejo.NewClient(api, options...)
	if err != nil {
		panic(err)
	}

	user, _, err := client.GetUserInfo(username)
	if err != nil {
		panic(err)
	}

	output := Output{
		UserName:          user.UserName,
		UserFollowerCount: user.FollowerCount,
		UserURL:           fmt.Sprintf("%s%s", api, user.UserName),
	}

	repos, _, err := client.ListUserRepos(username, forgejo.ListReposOptions{})
	if err != nil {
		panic(err)
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
			panic(err)
		}

		if len(commits) > 0 {
			commit := commits[0]
			output.LastCommitTime = commit.CommitMeta.Created.Format("2006-01-02T15:04:05Z07:00")
			output.LastCommitRepoName = mostRecentRepo.FullName
			output.LastCommitRepoURL = mostRecentRepo.HTMLURL
			output.LastCommitMessage = commit.RepoCommit.Message
			output.LastCommitURL = commit.HTMLURL
		}
	}

	j, err := json.Marshal(output)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "%v", string(j))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ForgejoHandler(w, r, os.Getenv("FORGEJO_API"), os.Getenv("FORGEJO_TOKEN"))
}
