depend:
	go run ./cmd/ps-get-projects/ -src data/projects.yaml -token="${GITHUB_API_TOKEN}" > data/projects.gen.yaml
