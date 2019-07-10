import * as React from "react";
import {
  IShellProps,
  ImageWithCaption,
  Paper,
  NoScript,
  Container
} from "@libresat/frontend-components";
import { Link } from "../downstream/Link";
import { MDXProvider } from "@mdx-js/react";
import { injectGlobal } from "emotion";
import { noscript } from "../data/noscript";
import {
  Segment,
  Menu,
  Container as ContainerTemplate,
  Modal
} from "semantic-ui-react";
import { Footer } from "./Footer";
import { footer } from "../data/footer";
import { common } from "../data/common";
import styled from "@emotion/styled-base";
import PageTransition from "gatsby-v2-plugin-page-transitions";
import { Search } from "./Search";
import { IHead, Head } from "./Head";

interface IBaseProps {
  children: JSX.Element | JSX.Element[];
  head: IHead;
  background: IShellProps["background"];
  noContainer?: IShellProps["noContainer"];
  segment?: IShellProps["segment"];
  noBackButton?: boolean;
}

const MainContainer = styled(Container)`
  ${props => !props.theme.noBackButton && "margin-top: calc(40px + 1em);"}
`;

const Pre = styled("pre")`
  overflow-x: auto;
`;

const SearchModalWrapper = styled(Modal)`
  & > .header {
    border-bottom: 0px solid transparent !important;
  }
`;

const NavbarSearch = styled(Search)`
  min-width: 200px !important;
  & > div:first-of-type {
    margin-bottom: 0 !important;
  }
  & > div:last-of-type {
    margin-bottom: 0 !important;
  }
`;

const TopSearch = styled(Search)`
  margin-top: 2.5em;
`;

const SearchModal = (props: any) => (
  <SearchModalWrapper
    trigger={<Menu.Item content="Search" icon="search" />}
    header="Search"
    content={<NavbarSearch />}
    dimmer={!common.dark() ? "inverted" : undefined}
    basic
    closeIcon
    {...props}
  />
);

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
        <Paper inverted={common.dark()} {...otherProps}>
          <i>{children}</i>
        </Paper>
      ),
      pre: ({ children, ...otherProps }: any) => (
        <Paper inverted={common.dark()} {...otherProps}>
          <i>{children.props.className.split("-")[1]}</i>
          <Pre>{children}</Pre>
        </Paper>
      ),
      code: ({ children }: any) => <code>{children}</code> // Fix "metastring" prop
    }}
    {...otherProps}
  >
    <>
      {injectGlobal`
        body {
          height: auto;
          &:after {
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
          &:before {
            top: 0;
            left: 0;
            content: '';
            position: fixed;
            width: 100vw;
            height: 100vh;
            z-index: -8;
            background: linear-gradient(to bottom left,${common.color()},#fc6d26);
            opacity: .4;
          }
        }
        .ui.menu, .ui.segment:not(.segment--main) {
          background: #ffffffe6;
          &.inverted {
            background: #1b1c1de6;
          }
        }
      `}
      <NoScript {...noscript} />
      {head && <Head {...head} />}
      {!noBackButton && (
        <>
          <Menu fixed="top" inverted={common.dark()}>
            <ContainerTemplate>
              <Menu.Item content="Back" icon="arrow left" as={Link} to="/" />
              <Menu.Menu position="right">
                <SearchModal />
              </Menu.Menu>
            </ContainerTemplate>
          </Menu>
        </>
      )}
      <PageTransition
        defaultStyle={{
          transition: "all 500ms",
          transform: "scale(1.01)",
          opacity: "0.5"
        }}
        transitionStyles={{
          entering: {
            transform: "scale(1)",
            opacity: "1"
          },
          entered: {
            transform: "",
            opacity: "1"
          },
          exiting: {
            transform: "",
            opacity: "1"
          }
        }}
        transitionTime={500}
      >
        {noContainer ? (
          <>
            {noBackButton && (
              <ContainerTemplate>
                <TopSearch />
              </ContainerTemplate>
            )}
            {segment ? (
              <>
                <Segment inverted={common.dark()} className="segment--main">
                  {children}
                </Segment>
              </>
            ) : (
              children
            )}
          </>
        ) : (
          <MainContainer theme={{ noBackButton }}>
            {noBackButton && (
              <ContainerTemplate>
                <TopSearch />
              </ContainerTemplate>
            )}
            {segment ? (
              <Segment inverted={common.dark()} className="segment--main">
                {children}
              </Segment>
            ) : (
              children
            )}
          </MainContainer>
        )}
      </PageTransition>
      <Footer {...footer} />
    </>
  </MDXProvider>
);

export { Base };
