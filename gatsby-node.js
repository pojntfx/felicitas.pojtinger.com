exports.createPages = async ({ graphql, actions: { createPage } }) => {
  createArticles(graphql, createPage);
};

createArticles = async (graphql, createPage) => {
  const { data } = await graphql(`
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
              imgSrc
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
  `);
  return data.allMdx.edges.forEach(
    async ({
      node: { parent, timeToRead, frontmatter, headings, excerpt }
    }) => {
      await createPage({
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
