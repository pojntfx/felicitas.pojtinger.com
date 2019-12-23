import {common} from "./common";
import {projects} from "./projects";
// import avatar from "../assets/avatars/avatar.webp";

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
        lang: common.language
    },
    content: {
        header: {
            name: "Felicitas Pojtinger",
            job: "Developer and Maker",
            // image: avatar, // This is now hard-coded to use static/avatars/avatar.webp
            follow: "https://twitter.com/intent/user?screen_name=pojntfx",
            email: "felicitas@pojtinger.com"
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
                    docsLink: "https://github.com"
                }
            },
            {
                title: "Twitter",
                img:
                    "https://img.shields.io/badge/Twitter-%40pojntfx-1DA1F2.svg?logo=twitter&style=popout",
                link: "https://twitter.com/pojntfx/",
                help: {
                    title: "Twitter",
                    text: "Where I post my opinions and ideas.",
                    docsLink: "https://twitter.com"
                }
            },
            {
                title: "Abitur",
                img:
                    "https://img.shields.io/badge/Abitur-PDF-ffd14e.svg?logo=google-drive&logoColor=ffd14e&style=popout",
                link:
                    "https://drive.google.com/file/d/1yPa2L8YIZIfkHnsjMBmNX8-e7plTMzCt/view?usp=sharing",
                help: {
                    title: "Abitur",
                    text: "The results of my A-Level exams (in German).",
                    docsLink: "https://en.wikipedia.org/wiki/Abitur"
                }
            },
            {
                title: "Curriculum Vitae",
                img:
                    "https://img.shields.io/badge/Curriculum%20Vitae-PDF-4c85d0.svg?logo=google&logoColor=528ff5&style=popout",
                link:
                    "https://docs.google.com/document/d/1rQ_jB4vrzNdB7qMG-JoEZ-uloAAfISxjcQxSKG2XDg8/edit?usp=sharing",
                help: {
                    title: "Curriculum Vitae",
                    text: "A chronological list of all relevant events of my life.",
                    docsLink: "https://en.wikipedia.org/wiki/Curriculum_vitae"
                }
            }
        ],
        skills: {
            description: "I'm a full stack developer based in Stuttgart, Germany.",
            descriptionLink:
                "https://www.openstreetmap.org/way/124979050#map=19/48.75712/9.27429",
            languages: ["Go", "JS (Node/React)", "Ruby"],
            languagesLink: "https://en.wikipedia.org/wiki/Isomorphic_JavaScript",
            tech: ["FLOSS", "GNU/Linux", "Docker", "Kubernetes"],
            techLink: "https://en.wikipedia.org/wiki/Kubernetes"
        },
        current: "Cluster Platform development for Alpha Horizon.",
        projects,
        activity:
            "https://gateway.activity.demos.clusterplatform.io?username=pojntfx"
    },
    background: common.background()
};

export {home};
