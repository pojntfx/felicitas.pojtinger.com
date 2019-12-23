import * as React from "react";
import {IHelp} from "@libresat/frontend-components/dist/types";
import {Link} from "./Link";
import {Help} from "@libresat/frontend-components";
import styled from "@emotion/styled";

const LinksWrapper = styled("div")`
  overflow-x: auto;
  white-space: nowrap;
  margin-left: auto !important;
  margin-right: auto !important;
  &::after {
    padding: 0 !important;
  }
  & > *:first-of-type {
    margin-left: 0 !important;
  }
  & > *:not(:last-of-type) {
    margin-right: 1em;
  }
  & img {
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.05) !important;
    }
  }
  & a {
    transition: all 0.2s ease-in-out !important;
    :hover {
      &:first-of-type {
        padding-left: 0.5em !important;
      }
      &:last-of-type {
        padding-right: 0.5em !important;
      }
    }
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

const LinksSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Links = ({links, ...otherProps}: ILinks) => (
    <LinksSection id="links">
        <LinksWrapper {...otherProps}>
            {links.map((link, index) => (
                <Link to={link.link} key={index}>
                    <Help {...link.help}>
                        <img src={link.img} alt={link.title}/>
                    </Help>
                </Link>
            ))}
        </LinksWrapper>
    </LinksSection>
);

export {Links};
