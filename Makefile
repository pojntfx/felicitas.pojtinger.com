# Variables
DESTDIR ?=

WWWROOT ?= /var/www/html
WWWPREFIX ?= /felix.pojtinger

PREFIX ?= /usr/local
OUTPUT_DIR ?= out
DST ?=

# Private variables
obj = ps-api ps-gen-projects ps-proxy
sts = ps-frontend
all: $(addprefix build-bin/,$(obj)) $(addprefix build-frontend/,$(sts))

# Build
build: $(addprefix build-bin/,$(obj)) $(addprefix build-frontend/,$(sts))

# Build binary
$(addprefix build-bin/,$(obj)):
ifdef DST
	go build -o $(DST) ./cmd/$(subst build-bin/,,$@)
else
	go build -o $(OUTPUT_DIR)/$(subst build-bin/,,$@) ./cmd/$(subst build-bin/,,$@)
endif

# Build frontend
$(addprefix build-frontend/,$(sts)):
	mkdir -p $(OUTPUT_DIR)
	hugo --baseUrl=/
	tar czvf $(OUTPUT_DIR)/$(subst build-frontend/,,$@).tar.gz -C public .

# Install
install: $(addprefix install-bin/,$(obj)) $(addprefix install-frontend/,$(sts))

# Install binary
$(addprefix install-bin/,$(obj)):
	install -D -m 0755 $(OUTPUT_DIR)/$(subst install-bin/,,$@) $(DESTDIR)$(PREFIX)/bin/$(subst install-bin/,,$@)

# Install frontend
$(addprefix install-frontend/,$(sts)):
	mkdir -p $(DESTDIR)$(WWWROOT)$(WWWPREFIX)
	cp -rf public/* $(DESTDIR)$(WWWROOT)$(WWWPREFIX)

# Uninstall
uninstall: $(addprefix uninstall-bin/,$(obj)) $(addprefix uninstall-frontend/,$(sts))

# Uninstall binary
$(addprefix uninstall-bin/,$(obj)):
	rm -f $(DESTDIR)$(PREFIX)/bin/$(subst uninstall-bin/,,$@)

# Uninstall frontend
$(addprefix uninstall-frontend/,$(sts)):
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
