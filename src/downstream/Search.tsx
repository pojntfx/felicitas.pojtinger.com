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
            frontmatter: { author, title, imgSrc, date },
            excerpt,
            parent: { name }
          }
        }: any) => {
          return {
            body: rawBody,
            imgSrc: withPrefix(imgSrc),
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
                imgSrc
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
