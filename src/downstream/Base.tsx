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
import {
  Segment,
  Menu,
  Container as ContainerTemplate
} from "semantic-ui-react";
import { Footer } from "./Footer";
import { footer } from "../data/footer";
import { common } from "../data/common";
import styled from "@emotion/styled-base";

interface IBaseProps {
  children: JSX.Element | JSX.Element[];
  head: IShellProps["head"];
  background: IShellProps["background"];
  noContainer?: IShellProps["noContainer"];
  segment?: IShellProps["segment"];
  noBackButton?: boolean;
}

const MainContainer = styled(Container)`
  ${props => !props.theme.noBackButton && "margin-top: calc(40px + 1em);"}
`;

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
            filter: blur(10px);
            transform: scale(1.1);
          }
        }
        .ui.menu, .ui.segment {
          background: #ffffffb3;
          &.inverted {
            background: #1b1c1db3;
          }
        }
      `}
      <NoScript {...noscript} />
      {head && <Head {...head} />}
      {!noBackButton && (
        <Menu fixed="top" inverted={common.dark}>
          <ContainerTemplate>
            <Menu.Item content="Back" icon="arrow left" as={Link} to="/" />
          </ContainerTemplate>
        </Menu>
      )}
      {noContainer ? (
        <>
          {segment ? (
            <Segment inverted={common.dark}>{children}</Segment>
          ) : (
            children
          )}
        </>
      ) : (
        <MainContainer theme={{ noBackButton }}>
          {segment ? (
            <Segment inverted={common.dark}>{children}</Segment>
          ) : (
            <>{children}</>
          )}
        </MainContainer>
      )}
      <Footer {...footer} />
    </>
  </MDXProvider>
);

export { Base };
