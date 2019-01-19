import { common } from "./common";
import avatar from "../assets/icon.png";

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
    header: {
      name: "Felicitas Pojtinger",
      job: "Cloud Developer / Maker",
      image: avatar,
      follow: "https://twitter.com/intent/user?screen_name=pojntfx",
      email: "mailto:felicitas@pojtinger.com"
    },
    links: [
      {
        title: "GitHub",
        img:
          "https://img.shields.io/badge/GitHub-%40pojntfx-181717.svg?logo=github&logoColor=ffffff",
        link: "https://github.com/pojntfx",
        help: {
          title: "GitHub",
          text: "Mirrors of my libre software projects.",
          docsLink: "https://github.com"
        }
      },
      {
        title: "Instagram",
        img:
          "https://img.shields.io/badge/Instagram-%40pojntfx-E4405F.svg?logo=instagram&style=social",
        link: "https://www.instagram.com/pojntfx/",
        help: {
          title: "Instagram",
          text: "Quick and simple, multimedia-driven posts and stories by me.",
          docsLink: "https://www.instagram.com"
        }
      },
      {
        title: "Twitter",
        img:
          "https://img.shields.io/badge/Twitter-%40pojntfx-1DA1F2.svg?logo=twitter&style=social",
        link: "https://twitter.com/pojntfx",
        help: {
          title: "Twitter",
          text: "Opinions and news by me.",
          docsLink: "https://https://twitter.com"
        }
      },
      {
        title: "GitLab",
        img:
          "https://img.shields.io/badge/GitLab-%40pojntfx-fc6d26.svg?logo=gitlab",
        link: "https://gitlab.com/pojntfx",
        help: {
          title: "GitLab",
          text: "Central place for all of my development work.",
          docsLink: "https://gitlab.com"
        }
      },
      {
        title: "Reddit",
        img:
          "https://img.shields.io/badge/reddit-u%2Fpojntfx-FF4500.svg?logo=reddit&style=social",
        link: "https://www.reddit.com/u/pojntfx",
        help: {
          title: "Reddit",
          text: "My account for general discussion.",
          docsLink: "https://www.reddit.com"
        }
      },
      {
        title: "NPM",
        img: "https://img.shields.io/badge/npm-%7epojntfx-CB3837.svg?logo=npm",
        link: "https://www.npmjs.com/~pojntfx",
        help: {
          title: "NPM",
          text: "Most of my development works as NodeJS packages.",
          docsLink: "https://www.npmjs.com"
        }
      },
      {
        title: "Mastodon",
        img:
          "https://img.shields.io/badge/Mastodon-%40pojntfx-3088D4.svg?logo=mastodon&style=social",
        link: "https://mastodon.social/@pojntfx",
        help: {
          title: "Mastodon",
          text: "Discussions and more.",
          docsLink: "https://mastodon.social"
        }
      },
      {
        title: "Facebook",
        img:
          "https://img.shields.io/badge/Facebook-%40pojntfx-3b5998.svg?logo=facebook&style=social",
        link: "https://www.facebook.com/pojntfx",
        help: {
          title: "Facebook",
          text: "Me on Facebook.",
          docsLink: "https://www.facebook.com"
        }
      }
    ],
    skills: {
      description: "I'm a fullstack developer based in Stuttgart, Germany.",
      languages: ["Node", "React", "Vue"],
      tech: ["FLOSS", "GNU/Linux", "Docker", "Kubernetes"]
    },
    current: "Standard Framework development for Alpha Horizon.",
    projects: [
      {
        title: "Standard Framework",
        description: "The futurist's approach to system design",
        link: "https://gitlab.com/standardframework/standardframework",
        color: "blue",
        icon: "cogs"
      },
      {
        title: "Learn Chinese Platform",
        description: "A modern and libre way to learn Chinese",
        link: "https://learn-chinese.tk/",
        color: "red",
        icon: "yen"
      },
      {
        title: "LibreSat",
        description:
          "The Free/Libre and Open Source satellite development and control platform",
        link: "https://libresat.space/",
        color: "black",
        icon: "space shuttle"
      },
      {
        title: "Die Illustrierte",
        description:
          'Fictional news site for the German novel "Der Goldne Topf"',
        link: "https://illustrierte.tk/",
        color: "grey",
        icon: "cogs"
      },
      {
        title: "Simple Direct Democracy",
        description: "Fast Ad-Hoc voting system in LAN",
        link: "https://gitlab.com/simple-direct-democracy",
        color: "yellow",
        icon: "newspaper"
      },
      {
        title: "IraSync",
        description: "Libre social network for democratic communities",
        link: "https://gitlab.com/irasync/frontend",
        color: "blue",
        icon: "users"
      },
      {
        title: "DSB Gateway",
        description:
          'Libre gateway to the proprietary "Digitales Schwarzes Brett" service used in German school',
        link:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/dsb-gateway-backend",
        color: "yellow",
        icon: "slideshare"
      },
      {
        title: "OneFeed",
        description: "Social media feed aggregator",
        link:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/social-media-feeds-gateway",
        color: "grey",
        icon: "feed"
      },
      {
        title: "Personal Site",
        description: "My personal site",
        link: "https://gitlab.com/pojntfx/projects/tree/master/packages/site",
        color: "orange",
        icon: "user"
      },
      {
        title: "Cafe Züfle",
        description: "Static JAMStack site for a local hotel",
        link: "https://cafe-zuefle.tk/",
        color: "orange",
        icon: "hotel"
      },
      {
        title: "Ergotherapie SSL",
        description: "Lightning-fast JAMStack site",
        link: "https://ergotherapie-ssl.de/",
        color: "red",
        icon: "user doctor"
      },
      {
        title: "CoffeeCodeContribute",
        description: "Lightning-fast JAMStack site",
        link: "https://coffeecodecontribute.gitlab.io/website/",
        color: "blue",
        icon: "coffee"
      },
      {
        title: "RvWG",
        description: "JAMStack site for my school",
        link: "https://rvwg.tk/",
        color: "orange",
        icon: "lab"
      },
      {
        title: "PaPaPo",
        description: "A simple video upload site for pandas (and Pascals)",
        link: "https://compassionate-northcutt-991637.netlify.com/",
        color: "pink",
        icon: "paw"
      },
      {
        title: "macGNUX",
        description: "The macOS UX, but on the GNU/Linux system",
        link:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/macos-ux-for-gnu-linux",
        color: "blue",
        icon: "apple"
      },
      {
        title: "Mailman Kubernetes",
        description: "Cloud native forum and mailing list",
        link: "https://gitlab.com/libresat/libresat/tree/master/packages/forum",
        color: "blue",
        icon: "mail"
      },
      {
        title: "Frontend Components",
        description: "High-level React component framework",
        link:
          "https://gitlab.com/libresat/libresat/tree/master/packages/frontend-components",
        color: "black",
        icon: "grid layout"
      },
      {
        title: "Identity",
        description: "Users, Roles and Scopes as a service",
        link:
          "https://gitlab.com/libresat/libresat/tree/master/packages/identity-backend",
        color: "violet",
        icon: "key"
      },
      {
        title: "SatCTL",
        description: "kubectl-like CLI to develop and/or control satellites",
        link:
          "https://gitlab.com/libresat/libresat/tree/master/packages/satctl",
        color: "pink",
        icon: "terminal"
      },
      {
        title: "Gitit Semantic Wiki",
        description: "Cloud native wiki based on git",
        link: "https://gitlab.com/libresat/libresat/tree/master/packages/wiki",
        color: "olive",
        icon: "file text"
      },
      {
        title: "Service",
        description: "Extensible MVC microservice framework",
        link:
          "https://gitlab.com/libresat/libresat/tree/master/packages/service",
        color: "brown",
        icon: "server"
      },
      {
        title: "OpenSNET BeachUX",
        description: "Minimal, fast and beautiful React components",
        link:
          "https://gitlab.com/libresat/archive/tree/master/packages/snet-bridge-client",
        color: "blue",
        icon: "street view"
      },
      {
        title: "DebianDeployer",
        description: "PXE Debian Preseeding and Installation",
        link:
          "https://gitlab.com/libresat/archive/tree/master/packages/infrastructure-legacy/debian",
        color: "purple",
        icon: "laptop"
      },
      {
        title: "Aqueropa",
        description:
          "A website with everything you could possibly want to know about aquatics",
        link: "https://aqeuropa.tk/index.html",
        color: "teal",
        icon: "cube"
      },
      {
        title: "Eluseum Framework",
        description: "Conservative CSS framework",
        link: "https://eluseum.tk/",
        color: "blue",
        icon: "briefcase"
      },
      {
        title: "SimpleVote",
        description: "An even simpler voting system",
        link: "https://gitlab.com/die-illustrierte/voting",
        color: "red",
        icon: "arrow up"
      },
      {
        title: "Adwaita GTK Ubuntu",
        description:
          "A modern Ambiance replacement that keeps Ubuntu's identity while staying upstream",
        link: "https://gitlab.com/pojntfx/adwaita-gtk-ubuntu",
        color: "orange",
        icon: "paint brush"
      }
    ],
    activity:
      "https://gateway.activity.demos.standardframework.com?username=pojntfx"
  },
  background: common.background
};

export { home };
