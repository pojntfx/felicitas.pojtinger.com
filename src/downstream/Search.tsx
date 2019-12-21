import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Search as SearchTemplate } from "@libresat/frontend-components";
import { withPrefix } from "gatsby-link";
import { Link } from "./Link";
import styled from "@emotion/styled";

const SearchWrapper = styled("section")`
  & > div:first-of-type {
    margin-bottom: 0 !important;
  }
  & > div:last-of-type {
    margin-bottom: 2.5em !important;
  }
  & .card {
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.025) !important;
      box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;
    }
  }
`;

const SearchView = ({
  data: {
    allMdx: { edges },
    allSitePage: { totalCount }
  },
  ...otherProps
}: any) => (
  <SearchWrapper id="search" {...otherProps}>
    <SearchTemplate
      placeholder={`Search ${totalCount} ${
        totalCount === 1 ? "page" : "pages"
      } ...`}
      source={edges.map(
        ({
          node: {
            rawBody,
            frontmatter: { author, title, date },
            excerpt,
            parent: { name }
          }
        }: any) => {
          return {
            body: rawBody,
            /* FIXME: Nested pages don't get a correct link if they are
            not blog posts! */
            link: /[0-9]+-[0-9]+-[0-9]+(.*)/.test(name)
              ? withPrefix(`/articles/${name}`)
              : name === "index"
              ? withPrefix("/")
              : withPrefix(name),
            header: title,
            meta: `${
              date
                ? new Date(date).toLocaleDateString()
                : new Date(
                    name
                      .split("-")
                      .filter((element: any, index: number) =>
                        index < 3 ? element : null
                      ) // Get the date from the post's filename, like with Jekyll
                      .join("-")
                  ).toLocaleDateString()
            } by ${author}`,
            description: excerpt
          };
        }
      )}
      linkComponent={Link}
      {...otherProps}
    />
  </SearchWrapper>
);

const Search = (props: any) => (
  <StaticQuery
    query={graphql`
      query SiteSearch {
        allMdx {
          edges {
            node {
              rawBody
              parent {
                ... on File {
                  name
                }
              }
              headings {
                value
                depth
              }
              frontmatter {
                author
                title
                date
              }
              excerpt
            }
          }
        }
        allSitePage {
          totalCount
        }
      }
    `}
    render={data => <SearchView data={data} {...props} />}
  />
);

export { SearchView, Search };
