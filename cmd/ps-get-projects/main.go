package main

import (
	"encoding/json"
	"flag"
	"fmt"

	"gopkg.in/yaml.v2"
)

const mockResponse = `{
  "id": 427117673,
  "node_id": "R_kgDOGXVMaQ",
  "name": "stfs",
  "full_name": "pojntfx/stfs",
  "private": false,
  "owner": {
    "login": "pojntfx",
    "id": 28832235,
    "node_id": "MDQ6VXNlcjI4ODMyMjM1",
    "avatar_url": "https://avatars.githubusercontent.com/u/28832235?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/pojntfx",
    "html_url": "https://github.com/pojntfx",
    "followers_url": "https://api.github.com/users/pojntfx/followers",
    "following_url": "https://api.github.com/users/pojntfx/following{/other_user}",
    "gists_url": "https://api.github.com/users/pojntfx/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/pojntfx/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/pojntfx/subscriptions",
    "organizations_url": "https://api.github.com/users/pojntfx/orgs",
    "repos_url": "https://api.github.com/users/pojntfx/repos",
    "events_url": "https://api.github.com/users/pojntfx/events{/privacy}",
    "received_events_url": "https://api.github.com/users/pojntfx/received_events",
    "type": "User",
    "site_admin": false
  },
  "html_url": "https://github.com/pojntfx/stfs",
  "description": "Simple Tape File System (STFS), a file system for tapes and tar files",
  "fork": false,
  "url": "https://api.github.com/repos/pojntfx/stfs",
  "forks_url": "https://api.github.com/repos/pojntfx/stfs/forks",
  "keys_url": "https://api.github.com/repos/pojntfx/stfs/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/pojntfx/stfs/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/pojntfx/stfs/teams",
  "hooks_url": "https://api.github.com/repos/pojntfx/stfs/hooks",
  "issue_events_url": "https://api.github.com/repos/pojntfx/stfs/issues/events{/number}",
  "events_url": "https://api.github.com/repos/pojntfx/stfs/events",
  "assignees_url": "https://api.github.com/repos/pojntfx/stfs/assignees{/user}",
  "branches_url": "https://api.github.com/repos/pojntfx/stfs/branches{/branch}",
  "tags_url": "https://api.github.com/repos/pojntfx/stfs/tags",
  "blobs_url": "https://api.github.com/repos/pojntfx/stfs/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/pojntfx/stfs/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/pojntfx/stfs/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/pojntfx/stfs/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/pojntfx/stfs/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/pojntfx/stfs/languages",
  "stargazers_url": "https://api.github.com/repos/pojntfx/stfs/stargazers",
  "contributors_url": "https://api.github.com/repos/pojntfx/stfs/contributors",
  "subscribers_url": "https://api.github.com/repos/pojntfx/stfs/subscribers",
  "subscription_url": "https://api.github.com/repos/pojntfx/stfs/subscription",
  "commits_url": "https://api.github.com/repos/pojntfx/stfs/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/pojntfx/stfs/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/pojntfx/stfs/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/pojntfx/stfs/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/pojntfx/stfs/contents/{+path}",
  "compare_url": "https://api.github.com/repos/pojntfx/stfs/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/pojntfx/stfs/merges",
  "archive_url": "https://api.github.com/repos/pojntfx/stfs/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/pojntfx/stfs/downloads",
  "issues_url": "https://api.github.com/repos/pojntfx/stfs/issues{/number}",
  "pulls_url": "https://api.github.com/repos/pojntfx/stfs/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/pojntfx/stfs/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/pojntfx/stfs/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/pojntfx/stfs/labels{/name}",
  "releases_url": "https://api.github.com/repos/pojntfx/stfs/releases{/id}",
  "deployments_url": "https://api.github.com/repos/pojntfx/stfs/deployments",
  "created_at": "2021-11-11T19:24:09Z",
  "updated_at": "2021-12-28T22:39:23Z",
  "pushed_at": "2021-12-28T23:25:42Z",
  "git_url": "git://github.com/pojntfx/stfs.git",
  "ssh_url": "git@github.com:pojntfx/stfs.git",
  "clone_url": "https://github.com/pojntfx/stfs.git",
  "svn_url": "https://github.com/pojntfx/stfs",
  "homepage": "",
  "size": 703,
  "stargazers_count": 2,
  "watchers_count": 2,
  "language": "Go",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 0,
  "license": {
    "key": "agpl-3.0",
    "name": "GNU Affero General Public License v3.0",
    "spdx_id": "AGPL-3.0",
    "url": "https://api.github.com/licenses/agpl-3.0",
    "node_id": "MDc6TGljZW5zZTE="
  },
  "allow_forking": true,
  "is_template": false,
  "topics": [
    "filesystem",
    "ltfs",
    "sqlite",
    "tape",
    "tape-archive",
    "tape-drive",
    "tape-library",
    "tar"
  ],
  "visibility": "public",
  "forks": 0,
  "open_issues": 0,
  "watchers": 2,
  "default_branch": "main",
  "temp_clone_token": null,
  "network_count": 0,
  "subscribers_count": 1
}`

// Output
type OutputCategory struct {
	Title    string `yaml:"title"`
	Projects []Project
}

type Output struct {
	Categories []OutputCategory `yaml:"categories"`
}

// Input
type InputCategory struct {
	Title string `json:"title"`
	Paths []string
}

type Input struct {
	Categories []InputCategory `json:"categories"`
}

// Input/Output
type Project struct {
	Title       string   `json:"full_name" yaml:"title"`
	Description string   `json:"description" yaml:"description"`
	Language    string   `json:"language" yaml:"language"`
	Date        string   `json:"pushed_at" yaml:"date"`
	Topics      []string `json:"topics" yaml:"topics"`
	Stars       int      `json:"stargazers_count" yaml:"stars"`
	Forks       int      `json:"forks_count" yaml:"forks"`
	Issues      int      `json:"open_issues_count" yaml:"issues"`
}

func main() {
	// 	src := flag.String("src", "projects.yaml", "Source YAML file")
	// 	dst := flag.String("dst", "projects.gen.yaml", "Destination YAML file")
	// 	key := flag.String("key", "", "GitHub API Key")

	flag.Parse()

	parsedInput := Input{
		Categories: []InputCategory{
			{
				Title: "Systems Development",
				Paths: []string{
					"pojntfx/stfs",
				},
			},
		},
	}

	outputCategories := []OutputCategory{}
	for _, inputCategory := range parsedInput.Categories {
		outputCategory := OutputCategory{
			Title:    inputCategory.Title,
			Projects: []Project{},
		}

		for _, _ = range inputCategory.Paths {
			var project Project
			if err := json.Unmarshal([]byte(mockResponse), &project); err != nil {
				panic(err)
			}

			outputCategory.Projects = append(outputCategory.Projects, project)
		}

		outputCategories = append(outputCategories, outputCategory)
	}

	parsedOutput := Output{
		Categories: outputCategories,
	}

	output, err := yaml.Marshal(parsedOutput)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(output))
}
