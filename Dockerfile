# Setup env
FROM amd64/node:10-buster-slim AS build
RUN mkdir -p /app
WORKDIR /app
RUN apt update
# For deasync@0.1.14
RUN apt install -y python build-essential
# For gatsby-plugin-sharp@2.2.28
RUN apt install -y libvips

# Setup app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Add app
COPY gatsby-browser.js .
COPY gatsby-config.js .
COPY gatsby-node.js .
COPY tsconfig.json .
COPY src src

# Compile app
RUN npm run build
RUN chmod +x src/cmd/*
RUN ./node_modules/.bin/pkg . -t node10-linux-x64 --output dist/app-amd64

# Setup env
FROM amd64/debian:10-slim

# Add app
COPY --from=build /app/dist/app-amd64 app

# Run app
CMD ["./app"]