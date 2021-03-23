import { common } from "./common";
import { projects } from "./projects";
// import avatar from "../assets/avatars/avatar.jpg";

const home = {
  head: {
    title: "Home",
    description: "My projects, articles and ideas.",
    author: common.author,
    keywords: ["home", "overview"],
    favicon: common.favicon,
    siteTitle: common.title,
    themeColor: common.color(),
    googleSiteVerification: "8r_iYyrRDdrnEa65S44-1Wp6WfTlci6okFcPQEkjNAY",
    lang: common.language,
  },
  content: {
    header: {
      name: "Felicitas Pojtinger",
      job: "Software Engineer",
      // image: avatar, // This is now hard-coded to use static/avatars/avatar.jpg
      follow: "https://twitter.com/intent/user?screen_name=pojntfx",
      email: "felicitas@pojtinger.com",
    },
    links: [
      {
        title: "GitHub",
        img:
          "https://img.shields.io/badge/GitHub-%40pojntfx-181717.svg?logo=github&logoColor=ffffff&style=popout",
        link: "https://github.com/pojntfx/",
        help: {
          title: "GitHub",
          text: "Where I work on software.",
          docsLink: "https://github.com",
        },
      },
      {
        title: "Twitter",
        img:
          "https://img.shields.io/badge/Twitter-%40pojntfx-1DA1F2.svg?logo=twitter&style=popout",
        link: "https://twitter.com/pojntfx/",
        help: {
          title: "Twitter",
          text: "Where I post my opinions and ideas.",
          docsLink: "https://twitter.com",
        },
      },
      {
        title: "Marks",
        img:
          "https://img.shields.io/badge/Marks-PDF-16ab39.svg?logo=nextcloud&logoColor=16ab39&style=popout",
        link: "https://nx904.your-storageshare.de/s/XtiGRek4rn57A7i",
        help: {
          title: "Marks",
          text: "Recent results of my uni exams.",
          docsLink: "https://www.hdm-stuttgart.de/",
        },
      },
      {
        title: "Curriculum Vitae",
        img:
          "https://img.shields.io/badge/Curriculum%20Vitae-PDF-4c85d0.svg?logo=google&logoColor=528ff5&style=popout",
        link:
          "https://docs.google.com/document/d/1rUE09TCqLs2_W5rBzC2dTvi2mzf7HM4QYhQxhpD5m2w/edit?usp=sharing",
        help: {
          title: "Curriculum Vitae",
          text: "A chronological list of all relevant events of my life.",
          docsLink: "https://en.wikipedia.org/wiki/Curriculum_vitae",
        },
      },
    ],
    skills: {
      description: "I'm a developer based in Stuttgart, Germany.",
      descriptionLink:
        "https://www.openstreetmap.org/search?whereami=1&query=48.74553%2C9.10098#map=19/48.74553/9.10098",
      languages: ["Go", "JS (Node/React)"],
      languagesLink: "https://en.wikipedia.org/wiki/Isomorphic_JavaScript",
      tech: ["FLOSS", "Linux", "Docker", "Kubernetes"],
      techLink: "https://en.wikipedia.org/wiki/Kubernetes",
    },
    current: "Cluster Platform development for Alpha Horizon.",
    projects,
    activity:
      "https://gateway.activity.demos.clusterplatform.io?username=pojntfx",
  },
  background: common.background(),
};

export { home };
