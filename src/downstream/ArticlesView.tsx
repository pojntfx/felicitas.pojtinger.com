import * as React from "react";
import { Coverflow } from "./Coverflow";
import { Link } from "./Link";

const ArticlesView = (
  {
    data: {
      allMdx: { edges }
    }
  }: any,
  ...otherProps: any
) => (
  <article>
    <Coverflow
      linkComponent={Link}
      items={edges
        .reduce((a, b) => [b, ...a], [])
        .sort(
          (a, b) =>
            new Date(
              a.node.frontmatter.lastEdit ||
                a.node.parent.name
                  .split("-")
                  .filter((element: any, index: number) =>
                    index < 3 ? element : null
                  ) // Get the date from the article's filename, like with Jekyll
                  .join("-")
            ).getTime() <
            new Date(
              b.node.frontmatter.lastEdit ||
                b.node.parent.name
                  .split("-")
                  .filter((element: any, index: number) =>
                    index < 3 ? element : null
                  ) // Get the date from the article's filename, like with Jekyll
                  .join("-")
            ).getTime()
        )
        .map(
          ({
            node: {
              parent,
              frontmatter: {
                author,
                title,
                imgSrc: {
                  childImageSharp: { fluid: image }
                }
              },
              excerpt
            }
          }: any) => ({
            image,
            link: `/articles/${parent.name}`,
            header: title,
            meta: `${new Date(
              parent.name
                .split("-")
                .filter((element: any, index: number) =>
                  index < 3 ? element : null
                ) // Get the date from the article's filename, like with Jekyll
                .join("-")
            ).toLocaleDateString()} by ${author}`,
            description: excerpt
          })
        )}
      {...otherProps}
    />
  </article>
);

export { ArticlesView };
