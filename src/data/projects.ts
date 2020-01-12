const projects = [
  {
    title: "DevOps",
    icon: "server",
    projects: [
      {
        title: "Cluster Platform",
        link:
          "https://clusterplatform.github.io/clusterplatform/packages/provisioner/",
        repoLink: "https://github.com/clusterplatform/clusterplatform",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "The lean distributed cloud computing system.",
        icon: "users",
        color: "black"
      },
      {
        title: "Charts",
        link: "https://pojntfx.github.io/charts/",
        repoLink: "https://github.com/pojntfx/charts",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Helm chart repository for my projects.",
        icon: "pallet",
        color: "blue"
      },
      {
        title: "go-isc-dhcp",
        link: "https://pojntfx.github.io/go-isc-dhcp/",
        repoLink: "https://github.com/pojntfx/go-isc-dhcp",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description:
          "Management daemons and CLIs for the ISC DHCP server and client.",
        icon: "list",
        color: "olive"
      },
      {
        title: "gon2n",
        link: "https://pojntfx.github.io/gon2n/",
        repoLink: "https://github.com/pojntfx/gon2n",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description:
          "Go bindings, management daemons and CLIs for n2n edges and supernodes.",
        icon: "globe",
        color: "pink"
      },
      {
        title: "dibs",
        link: "https://pojntfx.github.io/dibs/",
        repoLink: "https://github.com/pojntfx/dibs",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description:
          "System for distributed polyglot, multi-module, multi-architecture development and CI/CD.",
        icon: "sort",
        color: "green"
      },
      {
        title: "infractl",
        link: "https://pojntfx.github.io/infractl/",
        repoLink: "https://github.com/pojntfx/infractl",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description:
          "A supra-cloud CLI for nodes, layer 2/layer 3 overlay networks and Kubernetes clusters.",
        icon: "server",
        color: "orange"
      },
      {
        title: "Image Builder",
        link: "https://pojntfx.github.io/image-builder/",
        repoLink: "https://github.com/pojntfx/image-builder",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "A tool to build KubeVirt disk images.",
        icon: "camera",
        color: "red"
      },
      {
        title: "konfik",
        link: "https://pojntfx.github.io/konfik/",
        repoLink: "https://github.com/pojntfx/konfik",
        license: "AGPL-3.0",
        date: "2019-10-05",
        description: "A simple CLI to manage multiple kubeconfigs.",
        icon: "terminal",
        color: "violet"
      }
    ]
  },
  {
    title: "Utilities",
    icon: "boxes",
    projects: [
      {
        title: "TaskTimer",
        link: "https://task-timer.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/task-timer",
        license: "AGPL-3.0",
        date: "2019-10-09",
        description: "App to calculate the amount of time tasks will take.",
        icon: "grid layout",
        color: "blue"
      },
      {
        title: "Simple Direct Democracy",
        link: "https://simple-direct-democracy.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/simple-direct-democracy-frontend",
        license: "AGPL-3.0",
        date: "2018-05",
        description:
          "A simple real-time direct democracy's suggestion, voting and analytics system.",
        icon: "hand peace",
        color: "blue"
      },
      {
        title: "IraSync",
        link: "https://irasync.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/irasync-frontend",
        license: "AGPL-3.0",
        date: "2018-02",
        description: "Social network for democratic communities.",
        icon: "globe",
        color: "teal"
      },
      {
        title: "IraSync Paper",
        link:
          "https://drive.google.com/file/d/1RhvSlPAfOoo7v8rROizyyvqWXioSC4_o/view",
        license: "CC-BY-SA 4.0",
        date: "2018-03",
        description:
          "A detailed report on both Illustrierte and Irasync (in German).",
        icon: "book",
        color: "teal"
      }
    ]
  },
  {
    title: "Space",
    icon: "rocket",
    projects: [
      {
        title: "LibreSat",
        link: "https://libresat.clusterplatform.io/",
        repoLink: "https://github.com/clusterplatform/libresat",
        license: "AGPL-3.0",
        date: "2018-11",
        description:
          "Full-stack satellite development and control platform (downstream of the Cluster Platform).",
        icon: "globe",
        color: "black"
      },
      {
        title: "OpenSDCP",
        link: "https://opensdcp.clusterplatform.io/",
        repoLink: "https://github.com/clusterplatform/opensdcp-infrastructure",
        license: "AGPL-3.0",
        date: "2018-06",
        description:
          "Former satellite development and control platform (replaced by LibreSat).",
        icon: "th",
        color: "black"
      },
      {
        title: "ModSat Standard",
        link: "https://a360.co/2OkjFJq",
        license: "AGPL-3.0",
        date: "2016-10",
        description: "Modular standard for nanosatellites.",
        icon: "box",
        color: "blue"
      },
      {
        title: "ModSat Modules",
        link: "https://pojntfx.lima-city.de/sites/modsat.html",
        license: "AGPL-3.0",
        description:
          "Compute, communication, propulsion, energy and navigation modules for nanosatellites.",
        date: "2016-10",
        icon: "boxes",
        color: "blue"
      },
      {
        title: "ModSat Engine",
        link: "https://a360.co/2VxN1ex",
        license: "AGPL-3.0",
        date: "2017-04",
        description:
          "Modular dual-stage 4-grid 3D-printed ion engine for nanosatellites.",
        icon: "rocket",
        color: "blue"
      },
      {
        title: "ModSat Presentation",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoNWJjRlFoeW9FaEE/view?usp=sharing",
        license: "AGPL-3.0",
        date: "2017-04",
        description:
          "Overview of the ModSat nanosatellite project (in German).",
        icon: "slideshare",
        color: "blue"
      },
      {
        title: "ModSat Paper",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoaFpGMkRxOWI1Unc/view?usp=sharing",
        license: "CC-BY-SA 4.0",
        date: "2016-08",
        description:
          "Detailed report on the ModSat nanosatellite project (in German).",
        icon: "book",
        color: "blue"
      },
      {
        title: "SIEO",
        link: "https://pojntfx.lima-city.de/sites/sieo.html",
        license: "AGPL-3.0",
        date: "2016-05",
        description:
          "Smart Ion Engine Orbiter, an ion-engine powered nanosatellite reference system.",
        icon: "globe",
        color: "teal"
      },
      {
        title: "SIEO Paper",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoXzlPc2pjTlV3NkU/view",
        license: "CC-BY-SA 4.0",
        date: "2016-01",
        description: "A detailed report on the SIEO project (in German).",
        icon: "book",
        color: "teal"
      },
      {
        title: "Brahma",
        link: "https://a360.co/2JkwLam",
        license: "AGPL-3.0",
        date: "2017-01",
        description:
          "A global surveillance and tracking system based on low-level components and shortwave radio.",
        icon: "eye",
        color: "black"
      },
      {
        title: "Brahma Paper",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoS0lIRThRcVJ5aEE/view?usp=sharing",
        license: "CC-BY-SA 4.0",
        date: "2017-01",
        description: "A detailed report on the Brahma project (in German).",
        icon: "book",
        color: "black"
      }
    ]
  },
  {
    title: "Websites",
    icon: "newspaper",
    projects: [
      {
        title: "Personal Site",
        link: "/",
        repoLink: "https://github.com/pojntfx/personal-site",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Central hub for my projects and articles.",
        icon: "home",
        color: "blue"
      },
      {
        title: "Family Site",
        link: "https://pojtinger.com/",
        repoLink: "https://github.com/pojntfx/family-site",
        license: "AGPL-3.0",
        date: "2019-12-29",
        description: "A minimalist site I built for my family.",
        icon: "tree",
        color: "green"
      },
      {
        title: "RvWG",
        link: "https://rvwg.de/home/",
        repoLink: "https://github.com/pojntfx/rvwg-website",
        license: "GPL-3.0",
        date: "2017-06-01",
        description: "Legacy website for my former high school (in German).",
        icon: "university",
        color: "orange"
      },
      {
        title: "RvWG Neo",
        link: "https://rvwg-neo.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/rvwg-website-neo",
        license: "AGPL-3.0",
        date: "2018-11-06",
        description:
          "Partial rewrite of the RvWG site using the JAMStack (in German).",
        icon: "space shuttle",
        color: "yellow"
      },
      {
        title: "Pension Café Bäckerei Züfle",
        link: "https://cafe-zuefle.alphahorizon.io/",
        repoLink:
          "https://github.com/alphahorizonio/pension-cafe-baeckerei-zuefle-site",
        license: "AGPL-3.0",
        date: "2019-02-01",
        description: "JAMStack site for a local business.",
        icon: "food",
        color: "orange"
      },
      {
        title: "Gästehaus Gerhard Finkbeiner",
        link: "https://fewo-finkbeiner.alphahorizon.io/",
        repoLink: "https://github.com/alphahorizonio/fewo-finkbeiner-website",
        license: "AGPL-3.0",
        date: "2019-05-01",
        description: "JAMStack site for a local B&B (in German).",
        icon: "bed",
        color: "pink"
      },
      {
        title: "Ergotherapie Smeets-Labee",
        link: "https://ergotherapie-ssl.de/",
        repoLink: "https://github.com/alphahorizonio/ergotherapie-ssl-website",
        license: "AGPL-3.0",
        date: "2018-07",
        description: "JAMStack site for a local doctor's office (in German).",
        icon: "doctor",
        color: "red"
      }
    ]
  },
  {
    title: "Languages",
    icon: "language",
    projects: [
      {
        title: "Learn Chinese Platform",
        link: "https://learn-chinese-platform.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/learn-chinese-platform",
        license: "AGPL-3.0",
        date: "2018-12",
        description: "A modern and libre way to learn Chinese.",
        icon: "language",
        color: "red"
      },
      {
        title: "ChineseNotes",
        link: "https://chinese-notes.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/chinese-notes",
        license: "AGPL-3.0",
        date: "2019-05",
        description:
          "App to share notes from my Chinese learning journey (in German and Chinese).",
        icon: "book",
        color: "red"
      },
      {
        title: "ChineseContext",
        link: "https://app.learn-chinese-platform.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/learn-chinese-platform",
        license: "AGPL-3.0",
        date: "2019-01",
        description:
          "Microservice mesh to provide context, translations, visualizations and more for Chinese characters.",
        icon: "write",
        color: "red"
      }
    ]
  },
  {
    title: "Digital Publishing",
    icon: "newspaper outline",
    projects: [
      {
        title: "Abizeitung 2019",
        link:
          "https://drive.google.com/drive/folders/1nq7jsXdSWZfEkC2uBbyncTeg2ShlaTYK?usp=sharing",
        repoLink: "https://gitlab.com/pojntfx/abizeitung",
        license: "AGPL-3.0",
        date: "2019-06",
        description:
          "An Art Deco magazine and design system for a local high school.",
        icon: "building",
        color: "yellow"
      },
      {
        title: "Scribus CI/CD",
        link: "https://pojntfx.gitlab.io/abizeitung/",
        repoLink: "https://gitlab.com/pojntfx/abizeitung",
        license: "AGPL-3.0",
        date: "2019-07",
        description:
          "Cloud-native CI/CD system for digital publishing with Scribus.",
        icon: "plane",
        color: "blue"
      },
      {
        title: "Illustrierte",
        link: "https://illustrierte.felicitas.pojtinger.com/",
        repoLink: "https://github.com/pojntfx/illustrierte-website",
        license: "AGPL-3.0",
        date: "2018-01",
        description:
          "Modern reinterpretation of traditional media for German literature (in German).",
        icon: "newspaper",
        color: "black"
      },
      {
        title: "Illustrierte Paper",
        link:
          "https://drive.google.com/file/d/1RhvSlPAfOoo7v8rROizyyvqWXioSC4_o/view",
        license: "CC-BY-SA 4.0",
        date: "2018-03",
        description:
          "A detailed report on both Illustrierte and Irasync (in German).",
        icon: "book",
        color: "black"
      }
    ]
  },
  {
    title: "Frameworks",
    icon: "tags",
    projects: [
      {
        title: "Frontend Components",
        repoLink: "https://github.com/pojntfx/frontend-components/",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description:
          "A comprehensive high-level React component collection, based on Semantic UI React.",
        icon: "boxes",
        color: "black"
      },
      {
        title: "OpenSNET Bridge Client",
        repoLink:
          "https://github.com/clusterplatform/libresat-archive/tree/master/packages/snet-bridge-client",
        license: "AGPL-3.0",
        date: "2018-05",
        description:
          "Highly composable, stateless React UI framework built from scratch for spacecraft control UIs.",
        icon: "sun",
        color: "blue"
      },
      {
        title: "gomather",
        link: "https://pojntfx.github.io/gomather/",
        repoLink: "https://github.com/pojntfx/gomather",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Sane conventions for Go gRPC microservices.",
        icon: "cog",
        color: "blue"
      },
      {
        title: "mather.js",
        link: "https://pojntfx.github.io/mather.js/",
        repoLink: "https://github.com/pojntfx/mather.js",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Sane conventions for JS gRPC microservices.",
        icon: "js",
        color: "yellow"
      },
      {
        title: "mather-rb",
        link: "https://pojntfx.github.io/mather-rb/",
        repoLink: "https://github.com/pojntfx/mather-rb",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Sane conventions for Ruby gRPC microservices.",
        icon: "gem",
        color: "red"
      }
    ]
  },
  {
    title: "Teaching",
    icon: "slideshare",
    projects: [
      {
        title: "CoffeeCodeContribute",
        link: "https://coffeecodecontribute.org/",
        repoLink: "https://github.com/coffeecodecontribute/website",
        license: "AGPL-3.0",
        date: "2020 (in development)",
        description: "Caffeinated FLOSS Projects.",
        icon: "coffee",
        color: "brown"
      }
    ]
  }
];

export { projects };
