#!/usr/bin/node
import * as express from "express";
import * as path from "path";

/**
 * Start the site
 * @param port Port that the site should listen on
 */
const start = async (port: number | string) => {
  const app = express();
  app.use(express.static(path.join(__dirname, "../public")));
  return app.listen(port);
};

const {
  name,
  description: pkgDescription,
  version,
  author,
  license,
  homepage
} = require("../package.json");

const description = `Felix Pojtinger's Personal Site
${pkgDescription}

    Started successfully on port ${process.env.PORT || 8080}!

Version: ${name}#${version} by ${author}
License: ${license}
More info: ${homepage}`;

start(process.env.PORT || 8080).then(() => console.log(description));

export { start };
