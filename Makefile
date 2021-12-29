# Variables
DESTDIR ?=
WWWROOT ?= /var/www/html
WWWPREFIX ?= /felicitas.pojtinger

all: build

# Build
build:
	hugo --baseUrl=/
	
# Install
install:
	mkdir -p $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	cp -rf public/* $(DESTDIR)$(WWWROOT)$(WWWPREFIX)

# Uninstall
uninstall:
	rm -rf $(DESTDIR)$(WWWROOT)$(WWWPREFIX)

# Run
run:
	hugo server --baseUrl=/ --appendPort=false

# Develop
dev:
	hugo server -D --baseUrl=/ --appendPort=false

# Clean
clean:
	rm -rf public resources

# Dependencies
depend:
	go run ./cmd/ps-get-projects/ -src data/projects.yaml -token="${GITHUB_TOKEN}" > data/projects_gen.yaml
