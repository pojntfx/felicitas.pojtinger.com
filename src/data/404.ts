import { common } from "./common";

const pageNotFound = {
  head: {
    title: "Page not found!",
    description: "Sorry, but this page could not be found.",
    author: common.author,
    keywords: ["pageNotFound", "404", "rabbit"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color(),
    lang: common.language
  },
  background: common.background()
};

export { pageNotFound };
