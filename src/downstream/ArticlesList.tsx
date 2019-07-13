import * as React from "react";
import { ArticlesView } from "./ArticlesView";
import { StaticQuery, graphql } from "gatsby";

const ArticlesList = (props: any) => (
  <StaticQuery
    query={graphql`
      fragment articles on MdxConnection {
        edges {
          node {
            parent {
              ... on File {
                name
              }
            }
            frontmatter {
              author
              title
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
            }
            excerpt
          }
        }
      }

      query ArticlesQuery {
        allMdx(filter: { frontmatter: { article: { eq: true } } }) {
          ...articles
        }
      }
    `}
    render={data => <ArticlesView data={data} {...props} />}
  />
);

export { ArticlesList };
