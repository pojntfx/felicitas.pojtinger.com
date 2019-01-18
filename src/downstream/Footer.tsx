import * as React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "./Link";
import { common } from "../data/common";

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

const Footer = ({ copyright, imprint, ...otherProps }: IFooter) => (
  <Menu {...otherProps} stackable inverted={common.dark}>
    <Menu.Item
      content={`© ${copyright.timeSpan} ${copyright.holder}`}
      as={Link}
      to={copyright.link}
    />
    <Menu.Menu position="right">
      <Menu.Item
        content="Imprint"
        icon="legal"
        as={Link}
        to={imprint.link}
        activeClassName="active"
      />
    </Menu.Menu>
  </Menu>
);

export { Footer };
