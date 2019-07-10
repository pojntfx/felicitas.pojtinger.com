import * as React from "react";
import Helmet from "react-helmet";

interface IHead {
  title: string;
  description?: string;
  author?: string;
  keywords?: string[];
  favicon?: string;
  siteTitle?: string;
  themeColor?: string;
  lang?: string;
}

const Head = ({
  title,
  description,
  author,
  keywords,
  favicon,
  siteTitle,
  themeColor,
  lang,
  ...otherProps
}: IHead) => (
  <Helmet {...otherProps}>
    {lang ? (
      <html lang={lang} prefix="og: http://ogp.me/ns#" />
    ) : (
      <html lang="en" prefix="og: http://ogp.me/ns#" />
    )}
    <meta charSet="utf-8" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    {themeColor ? (
      <meta name="theme-color" content={themeColor} />
    ) : (
      <meta name="theme-color" content="#000000" />
    )}
    {description && <meta property="description" content={description} />}
    {description && <meta property="og:description" content={description} />}
    {keywords && (
      <meta
        name="keywords"
        content={keywords.slice(0, -1).join(",") + ", " + keywords.slice(-1)}
      />
    )}
    {author ? (
      <meta name="author" content={author} />
    ) : (
      <meta
        name="author"
        content="Felix Pojtinger <felix@pojtinger.com> @pojntfx"
      />
    )}
    {favicon ? (
      <link rel="icon" href={favicon} />
    ) : (
      <link rel="icon" href="/favicon.ico" />
    )}
    {favicon ? (
      <meta property="og:image" content={favicon} />
    ) : (
      <meta property="og:image" content="/favicon.ico" />
    )}
    <title>
      {title !== "Home"
        ? `${title} | ${siteTitle ? siteTitle : "LibreSat"}`
        : siteTitle
        ? siteTitle
        : "LibreSat"}
    </title>
    <meta
      property="og:title"
      content={
        title !== "Home"
          ? `${title} | ${siteTitle ? siteTitle : "LibreSat"}`
          : siteTitle
          ? siteTitle
          : "LibreSat"
      }
    />
  </Helmet>
);

export { Head, IHead };
