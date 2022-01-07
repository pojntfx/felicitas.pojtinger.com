# Variables
DESTDIR ?=

WWWROOT ?= /var/www/html
WWWPREFIX ?= /felix.pojtinger

PREFIX ?= /usr/local
OUTPUT_DIR ?= out
DST ?=

# Private variables
obj = ps-api ps-gen-projects ps-proxy
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
	hugo --baseUrl=/
	tar czvf $(OUTPUT_DIR)/$(subst build-pwa/,,$@).tar.gz -C public .

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
	go run ./cmd/ps-proxy/ -scmd='hugo server --baseUrl=/ --appendPort=false'

# Develop
dev:
	go run ./cmd/ps-proxy/ -scmd='hugo server -D --baseUrl=/ --appendPort=false' -verbose

# Clean
clean:
	rm -rf out public resources

# Dependencies
depend:
	mkdir -p assets/css
	curl -Lo assets/css/patternfly.css 'https://unpkg.com/@patternfly/patternfly@4.102.2/patternfly.css'
	curl -Lo assets/css/patternfly-addons.css 'https://unpkg.com/@patternfly/patternfly@4.102.2/patternfly-addons.css'
	go run ./cmd/ps-gen-projects/ -src data/projects.yaml > data/projects_gen.yaml
