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
              imgSrc
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
