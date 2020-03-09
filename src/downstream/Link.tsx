import * as React from "react";
import GatsbyLink from "gatsby-link";

const isExternalLink = (link: string) =>
  /((http|https):\/\/(.*)|(mailto|tel):(.*))/.test(link);
const isImageLink = (link: string) => /(.*)(\.jpg|\.png|\.webp)/.test(link);

interface ILinkProps {
  to: string;
  children?: JSX.Element | JSX.Element[] | string;
  exact?: boolean;
}

const Link = ({ to, children, exact, ...otherProps }: ILinkProps) =>
  isExternalLink(to) ? (
    <a {...otherProps} target="_blank" rel="noopener noreferrer" href={to}>
      {children ? children : null}
    </a>
  ) : isImageLink(to) ? (
    <a {...otherProps} target="_blank" rel="noopener noreferrer" href={to}>
      {/* Here we could prefix local images */}
      {children ? children : null}
    </a>
  ) : (
    <GatsbyLink to={to} {...otherProps}>
      {children ? children : null}
    </GatsbyLink>
  );

export { Link };
