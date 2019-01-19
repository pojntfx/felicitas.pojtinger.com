# Base image
FROM node:11.3.0-alpine

# Metadata
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"
LABEL license="AGPL-3.0"

# Update the system and install dependencies
RUN apk update
RUN apk add npm python alpine-sdk
RUN apk add vips --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

# Setup work dir
RUN mkdir -p /opt/pojntfx/site
WORKDIR /opt/pojntfx/site

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Add source code
COPY src src
COPY static static
COPY gatsby-config.js .
COPY gatsby-node.js .
COPY gatsby-browser.js .
COPY README.md .

# Build the app
RUN npm run build

# Configure the app
ENV PORT=5000
ENV NODE_ENV="production"

# Start the app
CMD npm start

# Expose HTTP gateway
EXPOSE 5000
