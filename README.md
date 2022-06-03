# Personal Site

My personal site.

[![hydrun CI](https://github.com/pojntfx/personal-site/actions/workflows/hydrun.yaml/badge.svg)](https://github.com/pojntfx/personal-site/actions/workflows/hydrun.yaml)
[![Go Reference](https://pkg.go.dev/badge/github.com/pojntfx/personal-site.svg)](https://pkg.go.dev/github.com/pojntfx/personal-site)
[![Binary Downloads](https://img.shields.io/github/downloads/pojntfx/personal-site/total?label=binary%20downloads)](https://github.com/pojntfx/personal-site/releases)

## Overview

🚧 This project is a work-in-progress! Instructions will be added as soon as it is usable. 🚧

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
