const projects = [
  {
    title: "Websites",
    icon: "newspaper",
    projects: [
      {
        title: "Personal Website",
        link: "https://felix.pojtinger.com",
        repoLink:
          "https://gitlab.com/pojntfx/pojntfx/tree/master/packages/site",
        license: "AGPL-3.0",
        date: "2019 (in development)",
        description: "The central hub for all things about me",
        icon: "home",
        color: "blue"
      },
      {
        title: "OneFeed",
        // link: "https://family.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/social-media-feeds-frontend",
        license: "AGPL-3.0",
        date: "2018-12",
        description:
          "Aggregate feeds from GitLab, GitHub, Reddit, Twitter, Facebook and Instagram into one API",
        icon: "feed",
        color: "teal"
      },
      {
        title: "Gästehaus Gerhard Finkbeiner",
        link: "https://fewo-finkbeiner.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/gaestehaus-gerhard-finkbeiner-site",
        license: "AGPL-3.0",
        date: "2019 (in development)",
        description: "JAMStack site for a local B&B (in German)",
        icon: "bed",
        color: "pink"
      },
      {
        title: "Pension Café Bäckerei Züfle",
        link: "https://cafe-zuefle.de",
        repoLink:
          "https://gitlab.com/pojntfx/pension-cafe-baeckerei-zuefle-site",
        license: "AGPL-3.0",
        date: "2019-02",
        description:
          "JAMStack site for a local bakery and restaurant (in German)",
        icon: "food",
        color: "orange"
      },
      {
        title: "Ergotherapie Smeets-Labee",
        link: "https://ergotherapie-ssl.de/",
        repoLink: "https://gitlab.com/pojntfx/ergotherapie-ssl-website",
        license: "AGPL-3.0",
        date: "2018-07",
        description: "JAMStack site for a local doctor's office (in German)",
        icon: "doctor",
        color: "red"
      },
      {
        title: "Neo Richard-von-Weizsäcker-Gymnasium",
        // link: "https://rvwg.pojtinger.space",
        repoLink: "https://gitlab.com/pojntfx/rvwg-website-neo",
        license: "AGPL-3.0",
        date: "2018-11",
        description: "JAMStack site for my high school (in German)",
        icon: "university",
        color: "orange"
      },
      {
        title: "Legacy Richard-von-Weizsäcker-Gymnasium",
        link: "https://rvwg.de",
        repoLink: "https://gitlab.com/rvwg/website",
        license: "AGPL-3.0",
        date: "2017-06",
        description: "Legacy site for my high school (in German)",
        icon: "university",
        color: "orange"
      }
    ]
  },
  {
    title: "Utility Apps",
    icon: "boxes",
    projects: [
      {
        title: "Konfik",
        repoLink:
          "https://gitlab.com/pojntfx/pojntfx/blob/master/packages/konfik",
        license: "AGPL-3.0",
        date: "2019-02",
        description: "CLI to manage multiple kubeconfigs",
        icon: "terminal",
        color: "black"
      },
      {
        title: "TaskTimer",
        link: "https://task-timer.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/pojntfx/tree/master/packages/task-timer",
        license: "AGPL-3.0",
        date: "2019-03",
        description: "App to calculate the amount of time tasks will take",
        icon: "grid layout",
        color: "blue"
      },
      {
        title: "HTML Visualizer",
        link: "https://html-visualizer.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/html-visualizer",
        license: "AGPL-3.0",
        date: "2019-04",
        description: "App to generate diagrams from HTML sites",
        icon: "sitemap",
        color: "blue"
      },
      {
        title: "DSB Gateway",
        // link: "https://dsb-gateway.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/incubator/tree/master/packages/dsb-gateway-frontend",
        license: "AGPL-3.0",
        date: "2018-10",
        description:
          'Gateway microservice to the proprietary "Digitales Schwarzes Brett" service used in German schools',
        icon: "ship",
        color: "orange"
      },
      {
        title: "PaPaPo",
        // link: "https://papapo.pojtinger.space",
        repoLink: "https://gitlab.com/pojntfx/papapo",
        license: "AGPL-3.0",
        date: "2018-09",
        description: "Video upload site for pandas (and Pascals)",
        icon: "video",
        color: "green"
      },
      {
        title: "SatCTL",
        repoLink:
          "https://gitlab.com/libresat/libresat/blob/master/packages/satctl",
        license: "AGPL-3.0",
        date: "2018-10",
        description: "Kubectl-like CLI to develop and/or control satellites",
        icon: "terminal",
        color: "black"
      }
    ]
  },
  {
    title: "Real-Time Apps",
    icon: "wifi",
    projects: [
      {
        title: "Simple Direct Democracy",
        // link: "https://simple-direct-democracy.pojtinger.space",
        repoLink: "https://gitlab.com/simple-direct-democracy/frontend",
        license: "AGPL-3.0",
        date: "2018-05",
        description:
          "A simple real-time direct democracy's suggestion, voting and analytics system",
        icon: "hand peace",
        color: "blue"
      },
      {
        title: "SimpleVote",
        repoLink: "https://gitlab.com/die-illustrierte/voting",
        license: "AGPL-3.0",
        date: "2018-06",
        description: "Minimal real-time voting app",
        icon: "hand peace outline",
        color: "green"
      }
    ]
  },
  {
    title: "Language Apps",
    icon: "language",
    projects: [
      {
        title: "Learn Chinese Platform",
        repoLink:
          "https://gitlab.com/pojntfx/learn-chinese-platform/tree/master/packages/site",
        license: "AGPL-3.0",
        date: "2018-12",
        description: "A modern and libre way to learn Chinese",
        icon: "language",
        color: "red"
      },
      {
        title: "ChineseNotes",
        link: "https://chinese-notes.pojtinger.space",
        repoLink:
          "https://gitlab.com/pojntfx/pojntfx/tree/master/packages/chinese-notes",
        license: "AGPL-3.0",
        date: "2019-04",
        description:
          "App to share notes from my Chinese learning journey (in German)",
        icon: "book",
        color: "red"
      },
      {
        title: "ChineseContext",
        repoLink:
          "https://gitlab.com/pojntfx/learn-chinese-platform/tree/master/packages/frontend",
        license: "AGPL-3.0",
        date: "2019-01",
        description:
          "Microservice mesh to provide context, translations, visualizations and more for Chinese characters",
        icon: "write",
        color: "red"
      }
    ]
  },
  {
    title: "Social Platforms",
    icon: "users",
    projects: [
      {
        title: "IraSync",
        // link: "https://irasync.pojtinger.space",
        repoLink: "https://gitlab.com/irasync/frontend",
        license: "AGPL-3.0",
        date: "2018-02",
        description: "Social network for democratic communities",
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
          "A detailed report on both Illustrierte and Irasync (in German)",
        icon: "book",
        color: "teal"
      }
    ]
  },
  {
    title: "Digital Publishing Platforms",
    icon: "newspaper outline",
    projects: [
      {
        title: "Illustrierte",
        link: "https://illustrierte.pojtinger.space",
        repoLink: "https://gitlab.com/die-illustrierte/website",
        license: "AGPL-3.0",
        date: "2018-01",
        description:
          "Modern reinterpretation of traditional media for German literature (in German)",
        icon: "newspaper",
        color: "black"
      },
      {
        title: "Illustrierte App",
        repoLink: "https://gitlab.com/die-illustrierte/app",
        license: "AGPL-3.0",
        date: "2018-01",
        description: "Mobile frontend to Illustrierte (in German)",
        icon: "feed",
        color: "black"
      },
      {
        title: "Illustrierte Paper",
        link:
          "https://drive.google.com/file/d/1RhvSlPAfOoo7v8rROizyyvqWXioSC4_o/view",
        license: "CC-BY-SA 4.0",
        date: "2018-03",
        description:
          "A detailed report on both Illustrierte and Irasync (in German)",
        icon: "book",
        color: "black"
      }
    ]
  },
  {
    title: "Space and Systems",
    icon: "rocket",
    projects: [
      {
        title: "Cluster Platform",
        link: "http://txti.es/clusterplatform/images",
        repoLink: "https://gitlab.com/clusterplatform/clusterplatform",
        license: "AGPL-3.0",
        date: "2019 (in development)",
        description:
          "Microservice-based system for development, distribution and operation of distributed systems on the edge and in the cloud",
        icon: "users",
        color: "black"
      },
      {
        title: "LibreSat",
        link: "https://libresat.space",
        repoLink: "https://gitlab.com/libresat/libresat",
        license: "AGPL-3.0",
        date: "2018-11",
        description:
          "Full-stack satellite development and control platform (superseded by Cluster Platform)",
        icon: "globe",
        color: "black"
      },
      {
        title: "ModSat Presentation",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoNWJjRlFoeW9FaEE/view?usp=sharing",
        license: "AGPL-3.0",
        date: "2017-04",
        description: "Overview of the ModSat nanosatellite project (in German)",
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
          "Detailed report on the ModSat nanosatellite project (in German)",
        icon: "book",
        color: "blue"
      },
      {
        title: "ModSat Standard",
        link: "https://a360.co/2OkjFJq",
        license: "AGPL-3.0",
        date: "2016-10",
        description: "Modular standard for nanosatellites",
        icon: "box",
        color: "blue"
      },
      {
        title: "ModSat Engine",
        link: "https://a360.co/2VxN1ex",
        license: "AGPL-3.0",
        date: "2017-04",
        description:
          "Modular dual-stage 4-grid 3D-printed ion engine for nanosatellites",
        icon: "rocket",
        color: "blue"
      },
      {
        title: "ModSat Modules",
        link: "https://pojntfx.lima-city.de/sites/modsat.html",
        license: "AGPL-3.0",
        description:
          "Compute, communication, propulsion, energy and navigation modules for nanosatellites",
        date: "2016-10",
        icon: "boxes",
        color: "blue"
      },
      {
        title: "SIEO",
        link: "https://pojntfx.lima-city.de/sites/sieo.html",
        license: "AGPL-3.0",
        date: "2016-05",
        description:
          "Smart Ion Engine Orbiter, an ion-engine powered nanosatellite reference system",
        icon: "globe",
        color: "teal"
      },
      {
        title: "SIEO Paper",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoXzlPc2pjTlV3NkU/view",
        license: "CC-BY-SA 4.0",
        date: "2016-01",
        description: "A detailed report on the SIEO project (in German)",
        icon: "book",
        color: "teal"
      },
      {
        title: "Brahma",
        link: "https://a360.co/2JkwLam",
        license: "AGPL-3.0",
        date: "2017-01",
        description:
          "A global surveillance and tracking system based on low-level components and shortwave radio",
        icon: "eye",
        color: "black"
      },
      {
        title: "Brahma Paper",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoS0lIRThRcVJ5aEE/view?usp=sharing",
        license: "CC-BY-SA 4.0",
        date: "2017-01",
        description: "A detailed report on the Brahma project (in German)",
        icon: "book",
        color: "black"
      },
      {
        title: "XGlide",
        link:
          "https://drive.google.com/file/d/0B7GcA5vEfPYoMWF4dE9MQTl5S1k/view?usp=sharing",
        license: "AGPL-3.0",
        date: "2016-06",
        description:
          "An ultra-lightweight CNC-milled blended-wing-body aircraft (in German)",
        icon: "plane",
        color: "red"
      }
    ]
  },
  {
    title: "Components",
    icon: "folder",
    projects: [
      {
        title: "Host Agent",
        repoLink:
          "https://gitlab.com/libresat/libresat/blob/master/packages/host-agent-core",
        license: "AGPL-3.0",
        date: "2018-09",
        description: "Library to declaratively control remote systems",
        icon: "terminal",
        color: "black"
      },
      {
        title: "Adwaita Ubuntu",
        repoLink: "https://gitlab.com/pojntfx/adwaita-gtk-ubuntu",
        license: "GPL-3.0",
        date: "2018-02",
        description: "A design system proposal for the Ubuntu project",
        icon: "paint brush",
        color: "orange"
      },
      {
        title: "macGNUX",
        repoLink:
          "https://gitlab.com/pojntfx/incubator/blob/master/packages/macos-ux-for-gnu-linux",
        license: "AGPL-3.0",
        date: "2018-11",
        description: "Port of the macOS UX to GNU/Linux",
        icon: "linux",
        color: "blue"
      }
    ]
  },
  {
    title: "Services",
    icon: "server",
    projects: [
      {
        title: "Legacy Provisioner",
        repoLink:
          "https://gitlab.com/pojntfx/pojntfx/blob/master/packages/provisioner",
        license: "AGPL-3.0",
        date: "2019-02",
        description:
          "Second-generation PXE-based microservice mesh for software distribution (superseded by Cluster Platform)",
        icon: "wifi",
        color: "yellow"
      },
      {
        title: "DebianDeployer",
        repoLink:
          "https://gitlab.com/libresat/archive/tree/master/packages/infrastructure-legacy",
        license: "AGPL-3.0",
        date: "2018-06",
        description:
          "First-generation PXE-based containers for software distribution (superseded by Legacy Provisioner)",
        icon: "terminal",
        color: "red"
      },
      {
        title: "Identity",
        // link: "https://identity.pojtinger.space",
        repoLink:
          "https://gitlab.com/libresat/libresat/blob/master/packages/identity-backend",
        license: "AGPL-3.0",
        date: "2018-10",
        description: "GraphQL-based microservice for role-based access control",
        icon: "users",
        color: "blue"
      },
      {
        title: "Semantic Wiki",
        repoLink:
          "https://gitlab.com/libresat/libresat/blob/master/packages/wiki",
        license: "AGPL-3.0",
        date: "2018-09",
        description:
          "A decentralized, git based functional wiki with a modern frontend",
        icon: "book",
        color: "black"
      },
      {
        title: "Mailman Cloud",
        repoLink:
          "https://gitlab.com/libresat/libresat/blob/master/packages/forum",
        license: "AGPL-3.0",
        date: "2018-09",
        description:
          "A cloud-native distribution of the GNU Mailman mailing list system",
        icon: "mail",
        color: "blue"
      }
    ]
  },
  {
    title: "Frameworks",
    icon: "tags",
    projects: [
      {
        title: "Frontend Components",
        repoLink:
          "https://gitlab.com/libresat/libresat/tree/master/packages/frontend-components",
        license: "AGPL-3.0",
        date: "2018-11",
        description:
          "Very high-level and opinionated framework for declarative frontend development for React based on Semantic-UI",
        icon: "boxes",
        color: "black"
      },
      {
        title: "Service Template",
        repoLink:
          "https://gitlab.com/libresat/libresat/tree/master/packages/example-backend-web",
        license: "AGPL-3.0",
        date: "2018-10",
        description:
          "Generic boilerplate to get started quickly on service development",
        icon: "chess board",
        color: "black"
      },
      {
        title: "Service",
        repoLink:
          "https://gitlab.com/libresat/libresat/tree/master/packages/service",
        license: "AGPL-3.0",
        date: "2018-09",
        description: "High-level microservice framework",
        icon: "chess rock",
        color: "black"
      },
      {
        title: "Eluseum",
        link: "https://eluseum.tk",
        repoLink: "https://gitlab.com/eluseum/framework",
        license: "AGPL-3.0",
        date: "2018-02",
        description: "Lean pure-CSS UI framework",
        icon: "newspaper",
        color: "blue"
      },
      {
        title: "BeachUX",
        // link: "https://beachux.pojtinger.space",
        repoLink:
          "https://gitlab.com/libresat/archive/tree/master/packages/snet-bridge-client",
        license: "AGPL-3.0",
        date: "2018-05",
        description: "Highly composable React UI framework built from scratch",
        icon: "sun",
        color: "blue"
      }
    ]
  },
  {
    title: "Teaching",
    icon: "slideshare",
    projects: [
      {
        title: "CoffeeCodeContribute",
        link: "https://coffeecodecontribute.gitlab.io/website/",
        repoLink: "https://gitlab.com/coffeecodecontribute/website",
        license: "AGPL-3.0",
        date: "2018-07",
        description: "A open-source software development bootcamp",
        icon: "coffee",
        color: "brown"
      }
    ]
  },
  {
    title: "Augmented and Virtual Reality, Mobile Development",
    icon: "laptop",
    projects: [
      {
        title: "thelink",
        link: "https://www.mtbs3d.com/phpBB/viewtopic.php?f=138&t=20114",
        license: "AGPL-3.0",
        date: "2014-08",
        description: "High-FOV VR headset",
        icon: "tv",
        color: "blue"
      },
      {
        title: "theview",
        link: "https://openhardwareglasses.blogspot.com/",
        license: "AGPL-3.0",
        date: "2013-12",
        description: "Google-Glass-inspired AR glasses",
        icon: "eye",
        color: "red"
      },
      {
        title: "iHD2",
        link: "https://forum.xda-developers.com/showthread.php?t=2376418",
        license: "GPL-3.0",
        date: "2013-07",
        description:
          "Android distribution/custom ROM for the HTC HD2 smartphone",
        icon: "phone",
        color: "red"
      }
    ]
  }
];

export { projects };
