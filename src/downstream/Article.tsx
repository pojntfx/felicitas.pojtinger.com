import * as React from "react";
import { Base } from "./Base";
import { articles } from "../data/articles";
import {
  Segment,
  Header as HeaderTemplate,
  Image,
  Icon
} from "semantic-ui-react";
import styled from "@emotion/styled-base";
import icon from "../assets/icon.webp";
import { Link } from "./Link";
import { common } from "../data/common";

const ArticleWrapper = styled(Segment)`
  padding: 0 !important;
`;

const Metadata = styled("div")`
  margin: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const Header = styled(HeaderTemplate)`
  padding-top: 1.5em !important;
  padding-bottom: 1.5em !important;
  padding-left: 0.5em !important;
  padding-right: 0.5em !important;
`;

const Author = styled("div")`
  display: flex;
  justify-content: start;
  align-items: center;
  & img {
    margin-right: 0.5em;
    max-width: 50px !important;
  }
  & b {
    font-size: larger;
  }
  margin-right: 1em;
`;

const HeaderImage = styled("div")`
  & > a > img {
    border-top-left-radius: 0.28571429rem;
    border-top-right-radius: 0.28571429rem;
  }
  & > div {
    font-style: italic;
    text-align: center;
    padding: 1em;
  }
`;

const TimeToRead = styled("div")`
  padding-bottom: 1em;
`;

const Article = ({
  children,
  pageContext: {
    author,
    date,
    lastEdit,
    imgSrc,
    imgAlt,
    timeToRead,
    title,
    excerpt
  }
}: any) => (
  <Base
    head={{
      ...articles.head,
      title: `${title} | ${articles.head.title}`
    }}
    background={articles.background}
  >
    <ArticleWrapper
      inverted={common.dark}
      itemScope={true}
      itemType="http://schema.org/BlogPosting"
    >
      {imgSrc && imgAlt && (
        <HeaderImage itemProp="sharedContent">
          <Image
            as={Link}
            to={imgSrc}
            alt={imgAlt}
            src={imgSrc}
            itemProp="image"
          />
          <div>{imgAlt}</div>
        </HeaderImage>
      )}
      <Header as="h1" inverted={common.dark}>
        <HeaderTemplate.Content itemProp="headline">
          {title}
          <HeaderTemplate.Subheader itemProp="about">
            {excerpt}
          </HeaderTemplate.Subheader>
        </HeaderTemplate.Content>
      </Header>
      <Metadata>
        <Author itemProp="author">
          <Image circular src={icon} itemProp="image" />
          <div>
            <span>by</span>
            <br />
            <b itemProp="name">{author}</b>
          </div>
        </Author>
        <div>
          <Icon name="calendar alternate" /> Published:{" "}
          <span itemProp="datePublished">
            {new Date(date).toLocaleDateString()}
          </span>
          <br />
          <Icon name="history" /> Last edit:{" "}
          <span itemProp="dateModified">
            {new Date(lastEdit).toLocaleDateString()}
          </span>
        </div>
      </Metadata>

      <Segment className="segment--main" inverted={common.dark}>
        <TimeToRead>
          <i>
            <Icon name="time" /> Estimated time to read:{" "}
            <span itemProp="timeRequired">
              {timeToRead} {timeToRead === 1 ? "minute" : "minutes"}
            </span>
            .
          </i>
        </TimeToRead>
        <span itemProp="articleBody">{children}</span>
      </Segment>
    </ArticleWrapper>
  </Base>
);

export default Article;
