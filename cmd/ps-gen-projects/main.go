package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"
	"time"

	"github.com/google/go-github/v41/github"
	"golang.org/x/oauth2"
	"gopkg.in/yaml.v2"
)

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
}

type OutputCategory struct {
	Title    string          `yaml:"title"`
	Projects []OutputProject `yaml:"projects"`
}

// Input
type InputCategory struct {
	Title    string   `yaml:"title"`
	Projects []string `yaml:"projects"`
}

func main() {
	src := flag.String("src", "projects.yaml", "Source YAML file")
	api := flag.String("api", "https://api.github.com/", "API endpoint to use (GitHub/Gitea)")
	token := flag.String("token", "", "GitHub/Gitea API access token")

	flag.Parse()

	input, err := os.ReadFile(*src)
	if err != nil {
		panic(err)
	}

	var parsedInput []InputCategory
	if err := yaml.Unmarshal(input, &parsedInput); err != nil {
		panic(err)
	}

	var httpClient *http.Client
	if *token != "" {
		httpClient = oauth2.NewClient(
			context.Background(),
			oauth2.StaticTokenSource(
				&oauth2.Token{
					AccessToken: *token,
				},
			),
		)
	}

	client := github.NewClient(httpClient)
	client.BaseURL, err = url.Parse(*api)
	if err != nil {
		panic(err)
	}

	parsedOutput := []OutputCategory{}
	for _, inputCategory := range parsedInput {
		outputCategory := OutputCategory{
			Title:    inputCategory.Title,
			Projects: []OutputProject{},
		}

		for _, slug := range inputCategory.Projects {
			owner, repo := path.Split(slug)

			project, _, err := client.Repositories.Get(context.Background(), strings.TrimSuffix(owner, "/"), repo)
			if err != nil {
				panic(err)
			}

			license := "UNLICENSED"
			if l := project.GetLicense(); l != nil {
				license = l.GetSPDXID()
			}

			outputCategory.Projects = append(outputCategory.Projects, OutputProject{
				URL:         project.GetHTMLURL(),
				Title:       project.GetFullName(),
				Description: project.GetDescription(),
				Language:    project.GetLanguage(),
				License:     license,
				Date:        project.GetPushedAt().Format(time.RFC3339),
				Topics:      project.Topics,
				Stars:       project.GetStargazersCount(),
				Forks:       project.GetForksCount(),
				Issues:      project.GetOpenIssuesCount(),
			})
		}

		parsedOutput = append(parsedOutput, outputCategory)
	}

	output, err := yaml.Marshal(parsedOutput)
	if err != nil {
		panic(err)
	}

	fmt.Print(string(output))
}
