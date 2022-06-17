# Personal Site

My personal site.

[![hydrun CI](https://github.com/pojntfx/personal-site/actions/workflows/hydrun.yaml/badge.svg)](https://github.com/pojntfx/personal-site/actions/workflows/hydrun.yaml)
![Go Version](https://img.shields.io/badge/go%20version-%3E=1.16-61CFDD.svg)
[![Go Reference](https://pkg.go.dev/badge/github.com/pojntfx/personal-site.svg)](https://pkg.go.dev/github.com/pojntfx/personal-site)
[![Binary Downloads](https://img.shields.io/github/downloads/pojntfx/personal-site/total?label=binary%20downloads)](https://github.com/pojntfx/personal-site/releases)

## Overview

This is my personal website, which is also intended to be a more or less generic template to build more personal websites with.

It provides the following information:

- Personal details (name, profession, pronouns)
- Social media details (Twitter/Mastodon/Instagram, Matrix/Signal, phone/mail)
- Latest GitHub commit
- Livestream (Twitch & YouTube) status
- Articles with comments
- Latest tweets
- Project list (fetched from GitHub)

## Installation

The web app is available on [GitHub releases](https://github.com/pojntfx/personal-site/releases) in the form of a static `.tar.gz` archive; to deploy it, simply upload it to a CDN or copy it to a web server. The release also includes the project list generation tool, API server and proxy. For most users, this shouldn't be necessary though; simply visit the [public deployment](https://felicitas.pojtinger.com/) to access it:

[<img src="https://github.com/alphahorizonio/webnetesctl/raw/main/img/launch.png" width="240">](https://felicitas.pojtinger.com/)

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
- [dghubble/go-twitter](https://github.com/dghubble/go-twitter) provides the Twitter API library.
- [google/go-github](https://github.com/google/go-github) provides the GitHub API library.
- [nicklaw5/helix](https://github.com/nicklaw5/helix) provides the Twitch API library.
- [googleapis/google-api-go-client](https://github.com/googleapis/google-api-go-client) provides the YouTube API library.
- [giscus/giscus](https://github.com/giscus/giscus) provides the comment system.
- The open source [PatternFly design system](https://www.patternfly.org/v4/) provides the components for the project.

To all the rest of the authors who worked on the dependencies used: **Thanks a lot!**

## Contributing

To contribute, please use the [GitHub flow](https://guides.github.com/introduction/flow/) and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

To build the site locally, run:

```shell
$ git clone https://github.com/pojntfx/personal-site.git
$ cd personal-site
$ make depend
$ export GITHUB_API=https://api.github.com/ GITHUB_TOKEN=your-github-api-token YOUTUBE_TOKEN=your-youtube-api-token TWITCH_CLIENT_ID=your-twitch-client-id TWITCH_CLIENT_SECRET=your-twitch-client-secret TWITTER_CLIENT_SECRET=your-twitter-client-secret TWITTER_CLIENT_ID=your-twitter-client-id
$ make dev
```

## License

Personal Site (c) 2022 Felicitas Pojtinger and contributors

SPDX-License-Identifier: AGPL-3.0
