import * as React from "react";
import LinkTemplate, { withPrefix } from "gatsby-link";

const isExternalLink = (link: string) => /(http|https):\/\/(.*)/.test(link);
const isImageLink = (link: string) => /(.*)(\.jpg|\.png|\.webp)/.test(link);

interface ILinkProps {
  to: string;
  children?: JSX.Element | JSX.Element[];
  exact?: boolean;
}

const Link = ({ to, children, exact, ...otherProps }: ILinkProps) =>
  isExternalLink(to) ? (
    <a {...otherProps} href={to}>
      {children ? children : null}
    </a>
  ) : isImageLink(to) ? (
    <a {...otherProps} href={withPrefix(to)}>
      {/* Prefix local images */}
      {children ? children : null}
    </a>
  ) : (
    <LinkTemplate to={withPrefix(to)} {...otherProps}>
      {children ? children : null}
    </LinkTemplate>
  );

export { Link };
