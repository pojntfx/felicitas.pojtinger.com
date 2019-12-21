import { common } from "./common";

const articles = {
  head: {
    title: "Articles",
    description: "My personal writings.",
    author: common.author,
    keywords: ["articles", "posts", "blog"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color(),
    lang: common.language
  },
  background: common.background()
};

export { articles };
