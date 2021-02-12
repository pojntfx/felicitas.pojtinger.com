import * as React from "react";
import { Menu as MenuTemplate, Container } from "semantic-ui-react";
import { Link } from "./Link";
import { common } from "../data/common";
import styled from "@emotion/styled";

interface IFooter {
  copyright: {
    timeSpan: string | number;
    holder: string;
    link: string;
  };
  imprint: {
    link: string;
  };
}

const Menu = styled(MenuTemplate)`
  border-radius: 0 !important;
  ${common.dark() &&
  `& > .container {
      & > .item:first-of-type {
        border-left: 0!important;
      }
    }`}
  ${!common.dark() &&
  `& > .container {
      & > .right.menu > .item:last-of-type {
        border-right: 1px solid rgba(34, 36, 38, 0.1);
      }
    }`}
`;

const Footer = ({ copyright, imprint, ...otherProps }: IFooter) => (
  <Menu stackable inverted={common.dark()} {...otherProps}>
    <Container>
      <MenuTemplate.Item
        content={`© ${copyright.timeSpan} ${copyright.holder}`}
        as={Link}
        to={copyright.link}
      />
      <MenuTemplate.Menu position="right">
        <MenuTemplate.Item
          content="Imprint"
          icon="legal"
          as={Link}
          to={imprint.link}
          activeClassName="active"
        />
      </MenuTemplate.Menu>
    </Container>
  </Menu>
);

export { Footer };
