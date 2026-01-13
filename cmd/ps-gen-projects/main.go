package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"

	"github.com/pojntfx/felicitas.pojtinger.com/pkg/forges"
	"gopkg.in/yaml.v3"
)

func main() {
	verbosity := flag.String("verbosity", "info", "Log level (debug, info, warn, error)")
	projectsFile := flag.String("projects", "projects.yaml", "Projects configuration file")
	forgesFile := flag.String("forges", filepath.Join("data", "forges.yaml"), "Forges configuration file")
	tokens := flag.String("tokens", "", "Forge tokens as JSON object, e.g. {\"github.com\": \"token\"} (can also be set using the FORGE_TOKENS env variable)")

	flag.Parse()

	var level slog.Level
	if err := level.UnmarshalText([]byte(*verbosity)); err != nil {
		panic(err)
	}

	log := slog.New(slog.NewJSONHandler(os.Stderr, &slog.HandlerOptions{
		Level: level,
	}))

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	log.Info("Reading forges configuration", "file", *forgesFile)

	forgesData, err := os.ReadFile(*forgesFile)
	if err != nil {
		panic(err)
	}

	var forgesList []forges.ForgeConfig
	if err := yaml.Unmarshal(forgesData, &forgesList); err != nil {
		panic(err)
	}

	if tokensEnv := os.Getenv("FORGE_TOKENS"); tokensEnv != "" {
		*tokens = tokensEnv
	}

	secrets := map[string]string{}
	if *tokens != "" {
		log.Info("Parsing forge tokens")

		if err := json.Unmarshal([]byte(*tokens), &secrets); err != nil {
			panic(fmt.Errorf("failed to parse tokens: %w", err))
		}
	}

	f, err := forges.OpenForges(ctx, forgesList, secrets)
	if err != nil {
		panic(err)
	}

	log.Debug("Initialized forge clients")

	log.Info("Reading projects file", "file", *projectsFile)

	input, err := os.ReadFile(*projectsFile)
	if err != nil {
		panic(err)
	}

	var inputCategories []forges.InputCategory
	if err := yaml.Unmarshal(input, &inputCategories); err != nil {
		panic(err)
	}

	log.Info("Fetching projects")

	outputCategories, err := f.FetchProjects(inputCategories)
	if err != nil {
		panic(err)
	}

	output, err := yaml.Marshal(outputCategories)
	if err != nil {
		panic(err)
	}

	fmt.Print(string(output))
}
