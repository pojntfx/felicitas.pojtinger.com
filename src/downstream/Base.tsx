import * as React from "react";
import {
  IShellProps,
  ImageWithCaption,
  Paper
} from "@libresat/frontend-components";
import { Link } from "../downstream/Link";
import { MDXProvider } from "@mdx-js/tag";

interface IBaseProps {
  children: JSX.Element | JSX.Element[];
  head: IShellProps["head"];
  background: IShellProps["background"];
}

const Base = ({ children, head, background, ...otherProps }: IBaseProps) => (
  <MDXProvider
    components={{
      a: ({ href, ...otherProps }: any) => <Link to={href} {...otherProps} />,
      img: ({ src, ...otherProps }: any) => (
        <ImageWithCaption as={Link} to={src} src={src} {...otherProps} />
      ),
      blockquote: ({ children, ...otherProps }: any) => (
        <Paper {...otherProps}>
          <i>{children}</i>
        </Paper>
      )
    }}
  >
    {children}
  </MDXProvider>
);

export { Base };
