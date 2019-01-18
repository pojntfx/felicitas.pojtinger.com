import * as React from "react";
import {
  IShellProps,
  ImageWithCaption,
  Paper,
  Head,
  NoScript,
  Container
} from "@libresat/frontend-components";
import { Link } from "../downstream/Link";
import { MDXProvider } from "@mdx-js/tag";
import { injectGlobal } from "emotion";
import { noscript } from "../data/noscript";
import { Segment, Button } from "semantic-ui-react";
import { Footer } from "./Footer";
import { footer } from "../data/footer";
import { common } from "../data/common";

interface IBaseProps {
  children: JSX.Element | JSX.Element[];
  head: IShellProps["head"];
  background: IShellProps["background"];
  noContainer?: IShellProps["noContainer"];
  segment?: IShellProps["segment"];
  noBackButton?: boolean;
}

const Base = ({
  children,
  head,
  background,
  noContainer,
  segment,
  noBackButton,
  ...otherProps
}: IBaseProps) => (
  <MDXProvider
    components={{
      a: ({ href, ...otherProps }: any) => <Link to={href} {...otherProps} />,
      img: ({ src, ...otherProps }: any) => (
        <ImageWithCaption as={Link} to={src} src={src} {...otherProps} />
      ),
      blockquote: ({ children, ...otherProps }: any) => (
        <Paper inverted={common.dark} {...otherProps}>
          <i>{children}</i>
        </Paper>
      )
    }}
    {...otherProps}
  >
    <>
      {injectGlobal`
        body {
          height: auto;
          &:before {
            top: 0;
            left: 0;
            content: '';
            position: fixed;
            width: 100vw;
            height: 100vh;
            z-index: -9;
            background: url(${background}) no-repeat center center fixed !important;
            background-size: cover !important;
            filter: blur(5px);
            transform: scale(1.1);
          }
        }
      `}
      <NoScript {...noscript} />
      {head && <Head {...head} />}
      {noContainer ? (
        <>
          {segment ? (
            <Segment inverted={common.dark}>{children}</Segment>
          ) : (
            children
          )}
          <Container>
            <Footer {...footer} />
          </Container>
        </>
      ) : (
        <Container>
          {!noBackButton && (
            <Link to="/">
              <Button
                content="Back"
                icon="arrow left"
                secondary={common.dark}
              />
            </Link>
          )}
          {segment ? (
            <Segment inverted={common.dark}>{children}</Segment>
          ) : (
            <>{children}</>
          )}
          <Footer {...footer} />
        </Container>
      )}
    </>
  </MDXProvider>
);

export { Base };
