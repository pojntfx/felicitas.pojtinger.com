import { common } from "./common";

const home = {
  head: {
    title: "Home",
    description: "General information on me.",
    author: common.author,
    keywords: ["home", "overview"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color,
    lang: common.language
  },
  content: {
    name: "Felicitas Pojtinger",
    job: "Cloud native developer and maker",
    avatar: "avatar.webp",
    description:
      "<b>Hi!</b> I'm a fullstack developer based in Stuttgart, Germany.",
    languages: ["Node", "React", "Vue"],
    tech: ["FLOSS", "GNU/Linux", "Docker", "Kubernetes"],
    email: "felicitas@pojtinger.com",
    follow: "https://twitter.com/intent/user?screen_name=pojntfx",
    current: "Standard Framework development for Alpha Horizon.",
    articles: [
      {
        title: "On Free Software",
        description: "Free as in Freedom, not in Price!",
        text: "Lorem ipsum."
      }
    ],
    projects: [
      {
        title: "Standard Framework",
        description: "The Futurist's Approach to System Design.",
        link: "https://standardframework.org"
      }
    ],
    github: "https://github.com/pojntfx",
    instagram: "https://instagram.com/pojntfx",
    twitter: "https://twitter.com/@pojntfx",
    npm: "https://npmjs.com/~pojntfx",
    gitlab: "https://gitlab.com/pojntfx",
    "dev.to": "https://dev.to/pojntfx",
    activity:
      "https://gateway.activity.demos.standardframework.com?username=pojntfx"
  },
  background: common.background
};

export { home };
