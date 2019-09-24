module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          articles: require.resolve("./src/downstream/Article.tsx")
        },
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 680,
              withWebp: true,
              showCaptions: true,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/articles/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      }
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `${require("./src/data/metadata.json").title}`,
        short_name: `${require("./src/data/metadata.json").shortTitle}`,
        start_url: "/",
        background_color: require("./src/data/metadata.json").color,
        theme_color: require("./src/data/metadata.json").color,
        display: "standalone",
        icon: "./src/assets/avatars/avatar-circular.webp"
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-typescript",
    "gatsby-v2-plugin-page-transitions",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/"
      }
    }
  ]
};
