# Personal Site

My personal site.

[![hydrun CI](https://github.com/pojntfx/felicitas.pojtinger.com/actions/workflows/hydrun.yaml/badge.svg)](https://github.com/pojntfx/felicitas.pojtinger.com/actions/workflows/hydrun.yaml)
![Go Version](https://img.shields.io/badge/go%20version-%3E=1.24-61CFDD.svg)
[![Go Reference](https://pkg.go.dev/badge/github.com/pojntfx/felicitas.pojtinger.com.svg)](https://pkg.go.dev/github.com/pojntfx/felicitas.pojtinger.com)

## Overview

This is my personal website, which is also intended to be a more or less generic template to build more personal websites with.

It provides the following information:

- Personal details (name, profession, pronouns)
- Social media details (Bluesky/Twitter (through [nitter](https://nitter.net/))/Instagram/Mastodon, Discord/Matrix/Signal, phone/mail)
- Latest GitHub commit
- Livestream (Twitch & YouTube) status
- Articles with comments
- Latest toots & tweets
- Project list (fetched from GitHub and Forgejo/Codeberg)

## Installation

The web app is available on [GitHub releases](https://github.com/pojntfx/felicitas.pojtinger.com/releases) in the form of a static `.tar.gz` archive; to deploy it, simply upload it to a CDN or copy it to a web server. The release also includes the project list generation tool, API server and proxy. For most users, this shouldn't be necessary though; simply visit the [public deployment](https://felicitas.pojtinger.com/) to access it:

[<img src="https://github.com/pojntfx/webnetesctl/raw/main/img/launch.png" width="240">](https://felicitas.pojtinger.com/)

## Screenshots

Click on an image to see a larger version.

<a display="inline" href="./docs/chrome.png?raw=true">
<img src="./docs/chrome.png" width="45%" alt="Screenshot of the site on Chrome" title="Screenshot of the site on Chrome">
</a>

<a display="inline" href="./docs/firefox.png?raw=true">
<img src="./docs/firefox.png" width="45%" alt="Screenshot of the site on Firefox" title="Screenshot of the site on Firefox">
</a>

<a display="inline" href="./docs/webkit.png?raw=true">
<img src="./docs/webkit.png" width="45%" alt="Screenshot of the site on WebKit" title="Screenshot of the site on WebKit">
</a>

<a display="inline" href="./docs/project-list.png?raw=true">
<img src="./docs/project-list.png" width="45%" alt="Screenshot of the project list" title="Screenshot of the project list">
</a>

<a display="inline" href="./docs/article-list.png?raw=true">
<img src="./docs/article-list.png" width="45%" alt="Screenshot of the article list" title="Screenshot of the article list">
</a>

<a display="inline" href="./docs/article.png?raw=true">
<img src="./docs/article.png" width="45%" alt="Screenshot of an article" title="Screenshot of an article">
</a>

<a display="inline" href="./docs/comments.png?raw=true">
<img src="./docs/comments.png" width="45%" alt="Screenshot of the article comment section" title="Screenshot of the article comment section">
</a>

## Acknowledgements

- [gohugoio/hugo](https://github.com/gohugoio/hugo) provides the static site generator.
- [zedeus/nitter](https://github.com/zedeus/nitter) provides the Twitter API.
- [mmcdole/gofeed](https://github.com/mmcdole/gofeed) provides the RSS library for nitter.
- [google/go-github](https://github.com/google/go-github) provides the GitHub API library.
- [nicklaw5/helix](https://github.com/nicklaw5/helix) provides the Twitch API library.
- [googleapis/google-api-go-client](https://github.com/googleapis/google-api-go-client) provides the YouTube API library.
- [giscus/giscus](https://github.com/giscus/giscus) provides the comment system.
- The open source [PatternFly design system](https://www.patternfly.org/v4/) provides the components for the project.

## Contributing

To contribute, please use the [GitHub flow](https://guides.github.com/introduction/flow/) and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

To build the site locally, run:

```shell
$ git clone https://github.com/pojntfx/felicitas.pojtinger.com.git
$ cd felicitas.pojtinger.com
$ make depend
$ export GITHUB_API=https://api.github.com/ GITHUB_TOKEN=your-github-api-token YOUTUBE_TOKEN=your-youtube-api-token TWITCH_CLIENT_ID=your-twitch-client-id TWITCH_CLIENT_SECRET=your-twitch-client-secret MASTODON_SERVER=https://mastodon.social MASTODON_CLIENT_ID=your-mastodon-client-id MASTODON_CLIENT_SECRET=your-mastodon-client-secret MASTODON_ACCESS_TOKEN=your-mastodon-access-token BLUESKY_SERVER=https://bsky.social/ BLUESKY_PASSWORD=your-bluesky-app-password SPOTIFY_CLIENT_ID=your-spotify-client-id SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
# This is only necessary if you want to use the Spotify integration - adjust your redirect URL accordingly
$ export SPOTIFY_REFRESH_TOKEN=$(go run ./cmd/ps-spotify-get-refresh-token --client-id=${SPOTIFY_CLIENT_ID} --client-secret=${SPOTIFY_CLIENT_SECRET} --redirect-url='http://localhost:1318/callback')
# If you want to rebuild the CV, else skip this step
$ make build-cv
$ make dev
```

## License

Personal Site (c) 2025 Felicitas Pojtinger and contributors

SPDX-License-Identifier: AGPL-3.0
