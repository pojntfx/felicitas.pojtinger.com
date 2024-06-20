# Variables
DESTDIR ?=

WWWROOT ?= /var/www/html
WWWPREFIX ?= /felicitas.pojtinger

PREFIX ?= /usr/local
OUTPUT_DIR ?= out
DST ?=

# Private variables
obj = ps-api ps-gen-projects ps-proxy ps-spotify-get-refresh-token
sts = ps-pwa
all: $(addprefix build-cli/,$(obj)) $(addprefix build-pwa/,$(sts))

# Build
build: $(addprefix build-cli/,$(obj)) $(addprefix build-pwa/,$(sts))

# Build binary
$(addprefix build-cli/,$(obj)):
ifdef DST
	go build -o $(DST) ./cmd/$(subst build-cli/,,$@)
else
	go build -o $(OUTPUT_DIR)/$(subst build-cli/,,$@) ./cmd/$(subst build-cli/,,$@)
endif

# Build frontend
$(addprefix build-pwa/,$(sts)):
	mkdir -p $(OUTPUT_DIR)
	hugo --baseURL=/
	tar czvf $(OUTPUT_DIR)/$(subst build-pwa/,,$@).tar.gz -C public .

# Build CV
build-cv:
	pandoc -f markdown-implicit_figures -o static/doc/cv.pdf static/doc/cv.md

# Install
install: $(addprefix install-cli/,$(obj)) $(addprefix install-pwa/,$(sts))

# Install binary
$(addprefix install-cli/,$(obj)):
	install -D -m 0755 $(OUTPUT_DIR)/$(subst install-cli/,,$@) $(DESTDIR)$(PREFIX)/bin/$(subst install-cli/,,$@)

# Install frontend
$(addprefix install-pwa/,$(sts)):
	mkdir -p $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	cp -rf public/* $(DESTDIR)$(WWWROOT)$(WWWPREFIX)

# Uninstall
uninstall: $(addprefix uninstall-cli/,$(obj)) $(addprefix uninstall-pwa/,$(sts))

# Uninstall binary
$(addprefix uninstall-cli/,$(obj)):
	rm -f $(DESTDIR)$(PREFIX)/bin/$(subst uninstall-cli/,,$@)

# Uninstall frontend
$(addprefix uninstall-pwa/,$(sts)):
	rm -rf $(DESTDIR)$(WWWROOT)$(WWWPREFIX)

# Run
run:
	go run ./cmd/ps-proxy/ -scmd='hugo server --baseURL=/ --appendPort=false'

# Develop
dev:
	go run ./cmd/ps-proxy/ -scmd='hugo server -D --baseURL=/ --appendPort=false' -verbose

# Clean
clean:
	rm -rf out public resources static/assets

# Dependencies
depend:
	npm i
	find node_modules/@patternfly/patternfly/ -name "*.css" -type f -delete
	rm -rf static/assets
	mkdir -p static
	cp -r node_modules/@patternfly/patternfly/assets static
	cp -r node_modules/@fontsource/lato/files static/assets/fonts/lato
	go run ./cmd/ps-gen-projects/ -src data/projects.yaml > data/projects_gen.yaml
