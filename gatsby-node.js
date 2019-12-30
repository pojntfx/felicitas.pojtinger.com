exports.createPages = ({ graphql, actions: { createPage } }) => {
  return createArticles(graphql, createPage);
};

createArticles = (graphql, createPage) => {
  return graphql(`
    {
      allMdx {
        edges {
          node {
            parent {
              ... on File {
                name
                absolutePath
              }
            }
            frontmatter {
              title
              author
              lastEdit
              imgSrc {
                childImageSharp {
                  fluid(maxWidth: 1920, quality: 95) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
              imgAlt
              date
              article
            }
            timeToRead
            headings {
              value
              depth
            }
            excerpt
          }
        }
      }
    }
  `).then(({ data }) =>
    data.allMdx.edges.forEach(
      ({ node: { parent, timeToRead, frontmatter, headings, excerpt } }) => {
        createPage({
          path: `/articles/${parent.name}`,
          component: parent.absolutePath,
          context: {
            ...frontmatter,
            title:
              headings.filter(({ depth }) => depth === 1).length === 0
                ? frontmatter.title
                : headings.filter(({ depth }) => depth === 1)[0].value,
            date: frontmatter.date
              ? frontmatter.date
              : parent.name
                  .split("-")
                  .filter((element, index) => (index < 3 ? element : null)) // Get the date from the article's filename, like with Jekyll
                  .join("-"),
            timeToRead,
            excerpt
          }
        });
      }
    )
  );
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader"
            }
          ]
        }
      ]
    }
  });
};