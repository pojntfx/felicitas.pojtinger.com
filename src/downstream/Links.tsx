import * as React from "react";
import { IHelp } from "@libresat/frontend-components/dist/types";
import { Link } from "./Link";
import { Help } from "@libresat/frontend-components";
import styled from "@emotion/styled";

const LinksWrapper = styled("div")`
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
  &::after {
    padding: 0 !important;
  }
  & > *:first-of-type {
    margin-left: 0 !important;
  }
  & > *:not(:last-of-type) {
    margin-right: 1em;
  }
`;

interface IBadge {
  title: string;
  img: string;
  link: string;
  help: IHelp;
}

interface ILinks {
  links: IBadge[];
}

const Links = ({ links, ...otherProps }: ILinks) => (
  <LinksWrapper {...otherProps}>
    {links.map((link, index) => (
      <Link to={link.link} key={index}>
        <Help {...link.help}>
          <img src={link.img} alt={link.title} />
        </Help>
      </Link>
    ))}
  </LinksWrapper>
);

export { Links };
