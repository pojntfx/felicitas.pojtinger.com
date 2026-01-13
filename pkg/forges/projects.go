package forges

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"codeberg.org/mvdkleijn/forgejo-sdk/forgejo"
	"github.com/google/go-github/v68/github"
	"golang.org/x/oauth2"
)

type ForgeType string

const (
	ForgeTypeGitHub  ForgeType = "github"
	ForgeTypeForgejo ForgeType = "forgejo"
)

type ForgeConfig struct {
	Domain string    `yaml:"domain"`
	Type   ForgeType `yaml:"type"`
	API    string    `yaml:"api"`
	CDN    string    `yaml:"cdn"`
	Icon   string    `yaml:"icon"`
	Name   string    `yaml:"name"`
	Shield string    `yaml:"shield"`
}

// Input
type InputProject struct {
	Repo       string `yaml:"repo"`
	Background string `yaml:"background"`
	Icon       string `yaml:"icon"`
}

type InputCategory struct {
	Title    string         `yaml:"title"`
	Projects []InputProject `yaml:"projects"`
}

// Output
type OutputProject struct {
	URL         string   `yaml:"url"`
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Language    string   `yaml:"language"`
	License     string   `yaml:"license"`
	Date        string   `yaml:"date"`
	Topics      []string `yaml:"topics"`
	Stars       int      `yaml:"stars"`
	Forks       int      `yaml:"forks"`
	Issues      int      `yaml:"issues"`
	Background  string   `yaml:"background"`
	Icon        string   `yaml:"icon"`
	ForgeDomain string   `yaml:"forgeDomain"`
	ForgeIcon   string   `yaml:"forgeIcon"`
	ForgeName   string   `yaml:"forgeName"`
}

type OutputCategory struct {
	Title    string          `yaml:"title"`
	Projects []OutputProject `yaml:"projects"`
}

type Forges struct {
	forges         map[string]ForgeConfig
	githubClients  map[string]*github.Client
	forgejoClients map[string]*forgejo.Client
	ctx            context.Context
}

func OpenForges(ctx context.Context, forgesList []ForgeConfig, tokens map[string]string) (*Forges, error) {
	forgesMap := map[string]ForgeConfig{}
	for _, forge := range forgesList {
		forgesMap[forge.Domain] = forge
	}

	f := &Forges{
		forges:         forgesMap,
		githubClients:  map[string]*github.Client{},
		forgejoClients: map[string]*forgejo.Client{},
		ctx:            ctx,
	}

	for domain, forge := range forgesMap {
		switch forge.Type {
		case ForgeTypeGitHub:
			var httpClient *http.Client
			if token, ok := tokens[domain]; ok && token != "" {
				httpClient = oauth2.NewClient(
					ctx,
					oauth2.StaticTokenSource(
						&oauth2.Token{
							AccessToken: token,
						},
					),
				)
			}

			client := github.NewClient(httpClient)
			baseURL, err := url.Parse(forge.API)
			if err != nil {
				return nil, fmt.Errorf("failed to parse GitHub API URL for %s: %w", domain, err)
			}
			client.BaseURL = baseURL

			f.githubClients[domain] = client

		case ForgeTypeForgejo:
			options := []forgejo.ClientOption{
				forgejo.SetContext(ctx),
			}
			if token, ok := tokens[domain]; ok && token != "" {
				options = append(options, forgejo.SetToken(token))
			}

			client, err := forgejo.NewClient(forge.API, options...)
			if err != nil {
				return nil, fmt.Errorf("failed to create Forgejo client for %s: %w", domain, err)
			}

			f.forgejoClients[domain] = client
		}
	}

	return f, nil
}

func (f *Forges) FetchProjects(categories []InputCategory) ([]OutputCategory, error) {
	var outputCategories []OutputCategory

	for _, inputCategory := range categories {
		outputCategory := OutputCategory{
			Title:    inputCategory.Title,
			Projects: []OutputProject{},
		}

		for _, inputProject := range inputCategory.Projects {
			project, err := f.fetchProject(inputProject)
			if err != nil {
				return nil, err
			}
			outputCategory.Projects = append(outputCategory.Projects, project)
		}

		outputCategories = append(outputCategories, outputCategory)
	}

	return outputCategories, nil
}

func (f *Forges) fetchProject(input InputProject) (OutputProject, error) {
	parts := strings.SplitN(input.Repo, "/", 3)
	if len(parts) != 3 {
		return OutputProject{}, fmt.Errorf("invalid repo format, expected domain/owner/repo: %s", input.Repo)
	}

	domain := parts[0]
	owner := parts[1]
	repo := parts[2]

	forge, ok := f.forges[domain]
	if !ok {
		return OutputProject{}, fmt.Errorf("unknown forge domain: %s", domain)
	}

	switch forge.Type {
	case ForgeTypeGitHub:
		return f.fetchGitHubProject(domain, owner, repo, input, forge)
	case ForgeTypeForgejo:
		return f.fetchForgejoProject(domain, owner, repo, input, forge)
	default:
		return OutputProject{}, fmt.Errorf("unsupported forge type: %s", forge.Type)
	}
}

func (f *Forges) fetchGitHubProject(domain, owner, repo string, input InputProject, forge ForgeConfig) (OutputProject, error) {
	client, ok := f.githubClients[domain]
	if !ok {
		return OutputProject{}, fmt.Errorf("no GitHub client for forge domain: %s", domain)
	}

	project, _, err := client.Repositories.Get(f.ctx, owner, repo)
	if err != nil {
		return OutputProject{}, fmt.Errorf("failed to get GitHub repository: %w", err)
	}

	license := "UNLICENSED"
	if l := project.GetLicense(); l != nil {
		license = l.GetSPDXID()
	}

	commits, _, err := client.Repositories.ListCommits(f.ctx, owner, repo, &github.CommitsListOptions{})
	if err != nil {
		return OutputProject{}, fmt.Errorf("failed to list commits: %w", err)
	}

	latestCommitDate := project.GetPushedAt().Time
	if len(commits) > 0 {
		latestCommitDate = commits[0].Commit.Author.Date.Time
	}

	icon := ""
	if input.Icon != "" {
		icon, err = url.JoinPath(forge.CDN, owner, repo, project.GetDefaultBranch(), input.Icon)
		if err != nil {
			return OutputProject{}, fmt.Errorf("failed to construct icon URL: %w", err)
		}
	}

	return OutputProject{
		URL:         project.GetHTMLURL(),
		Title:       project.GetFullName(),
		Description: project.GetDescription(),
		Language:    project.GetLanguage(),
		License:     license,
		Date:        latestCommitDate.Format(time.RFC3339),
		Topics:      project.Topics,
		Stars:       project.GetStargazersCount(),
		Forks:       project.GetForksCount(),
		Issues:      project.GetOpenIssuesCount(),
		Background:  input.Background,
		Icon:        icon,
		ForgeDomain: domain,
		ForgeIcon:   forge.Icon,
		ForgeName:   forge.Name,
	}, nil
}

func (f *Forges) fetchForgejoProject(domain, owner, repo string, input InputProject, forge ForgeConfig) (OutputProject, error) {
	client, ok := f.forgejoClients[domain]
	if !ok {
		return OutputProject{}, fmt.Errorf("no Forgejo client for forge domain: %s", domain)
	}

	project, _, err := client.GetRepo(owner, repo)
	if err != nil {
		return OutputProject{}, fmt.Errorf("failed to get Forgejo repository: %w", err)
	}

	commits, _, err := client.ListRepoCommits(owner, repo, forgejo.ListCommitOptions{})
	if err != nil {
		return OutputProject{}, fmt.Errorf("failed to list commits: %w", err)
	}

	languages, _, err := client.GetRepoLanguages(owner, repo)
	if err != nil {
		return OutputProject{}, fmt.Errorf("failed to get repository languages: %w", err)
	}

	primaryLanguage := ""
	var maxBytes int64
	for lang, bytes := range languages {
		if bytes > maxBytes {
			maxBytes = bytes
			primaryLanguage = lang
		}
	}

	latestCommitDate := project.Updated
	if len(commits) > 0 {
		if commitDate, err := time.Parse(time.RFC3339, commits[0].RepoCommit.Author.Date); err == nil {
			latestCommitDate = commitDate
		}
	}

	icon := ""
	if input.Icon != "" {
		icon, err = url.JoinPath(forge.CDN, owner, repo, "raw", "branch", project.DefaultBranch, input.Icon)
		if err != nil {
			return OutputProject{}, fmt.Errorf("failed to construct icon URL: %w", err)
		}
	}

	return OutputProject{
		URL:         project.HTMLURL,
		Title:       project.FullName,
		Description: project.Description,
		Language:    primaryLanguage,
		License:     "",
		Date:        latestCommitDate.Format(time.RFC3339),
		Topics:      []string{},
		Stars:       project.Stars,
		Forks:       project.Forks,
		Issues:      project.OpenIssues,
		Background:  input.Background,
		Icon:        icon,
		ForgeDomain: domain,
		ForgeIcon:   forge.Icon,
		ForgeName:   forge.Name,
	}, nil
}
