# Variables
DESTDIR ?=
WWWROOT ?= /var/www/html
WWWPREFIX ?= /felix.pojtinger
PREFIX ?= /usr/local
OUTPUT_DIR ?= out

all: build

# Build
build:
	rm -rf public
	hugo --baseUrl=/
	tar czvf $(OUTPUT_DIR)/ps.tar.gz -C public .
	go build -o $(OUTPUT_DIR)/ps-api ./cmd/ps-api
	go build -o $(OUTPUT_DIR)/ps-proxy ./cmd/ps-proxy
	
# Install
install:
	mkdir -p $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	cp -rf public/* $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	install -D -m 0755 $(OUTPUT_DIR)/ps-api $(DESTDIR)$(PREFIX)/bin/ps-api
	install -D -m 0755 $(OUTPUT_DIR)/ps-proxy $(DESTDIR)$(PREFIX)/bin/ps-proxy

# Uninstall
uninstall:
	rm -rf $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	rm $(DESTDIR)$(PREFIX)/bin/ps-api $(DESTDIR)$(PREFIX)/bin/ps-proxy

# Run
run:
	go run ./cmd/ps-proxy/ -scmd='hugo server --baseUrl=/ --appendPort=false'

# Develop
dev:
	go run ./cmd/ps-proxy/ -scmd='hugo server -D --baseUrl=/ --appendPort=false'

# Clean
clean:
	rm -rf out public resources

# Dependencies
depend:
	mkdir -p static/css
	curl -Lo static/css/patternfly.css 'https://unpkg.com/@patternfly/patternfly@4.102.2/patternfly.css'
	curl -Lo static/css/patternfly-addons.css 'https://unpkg.com/@patternfly/patternfly@4.102.2/patternfly-addons.css'
	go run ./cmd/ps-gen-projects/ -src data/projects.yaml -token="${GITHUB_TOKEN}" > data/projects_gen.yaml
