import * as React from "react";
import { Base } from "./Base";
import { articles } from "../data/articles";
import {
  Segment,
  Header as HeaderTemplate,
  Icon,
  Image as AvatarImage,
} from "semantic-ui-react";
import styled from "@emotion/styled";
import icon from "../assets/avatars/avatar.jpg";
import { Link } from "./Link";
import { common } from "../data/common";
import Image from "gatsby-image";

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
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0.75m !important;
  padding-bottom: 0.75em !important;
  padding-left: 0.5em !important;
  padding-right: 0.5em !important;
  background-image: linear-gradient(
    to bottom,
    ${common.dark() ? "rgb(27, 28, 29)" : "rgba(255, 255, 255, 0.9)"},
    ${common.dark() ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)"}
  );
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
  & .gatsby-image-wrapper {
    max-height: 300px;
  }
  & img {
    border-top-left-radius: 0.28571429rem;
    border-top-right-radius: 0.28571429rem;
  }
  & > div:last-child {
    padding: 1em;
    margin-top: calc(
      -1.4em - 2em + 1px
    ); // +1px because of WebKit rendering issues
    position: relative;
    backdrop-filter: saturate(180%) blur(20px);
    background-image: linear-gradient(
      ${common.dark() ? "rgba(27, 28, 29, 0.9)" : "rgba(255, 255, 255, 0.9)"},
      ${common.dark() ? "rgb(27, 28, 29) 60%" : "#ffffff"}
    );
    border-top-left-radius: 0.28571429rem;
    border-top-right-radius: 0.28571429rem;
    overflow-x: auto;
    text-align: center;
    & > span {
      white-space: nowrap;
      font-style: italic;
    }
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
    imgSrc: {
      childImageSharp: { fluid: image },
    },
    imgAlt,
    timeToRead,
    title,
    excerpt,
  },
}: any) => (
  <Base
    head={{
      ...articles.head,
      title: `${title} | ${articles.head.title}`,
    }}
    background={articles.background}
    article
  >
    <article itemScope itemType="http://schema.org/BlogPosting">
      <ArticleWrapper inverted={common.dark()}>
        {image && imgAlt && (
          <HeaderImage>
            <Link to={image.originalImg} target="_blank">
              <Image fluid={image} itemProp="image" />
            </Link>
            <div>
              <span>{imgAlt}</span>
            </div>
          </HeaderImage>
        )}
        <Header as="h1" inverted={common.dark()}>
          <HeaderTemplate.Content>
            <span itemProp="headline">{title}</span>
            <HeaderTemplate.Subheader>
              <span itemProp="about">{excerpt}</span>
            </HeaderTemplate.Subheader>
          </HeaderTemplate.Content>
        </Header>
        <Metadata>
          <Author
            itemProp="author"
            itemScope
            itemType="http://schema.org/Person"
          >
            <AvatarImage circular src={icon} itemProp="image" />
            <div>
              <span>by</span>
              <br />
              <b itemProp="name">{author}</b>
            </div>
          </Author>
          <span
            style={{ display: "none" }}
            itemProp="publisher"
            itemScope
            itemType="http://schema.org/Organization"
          >
            <span
              itemProp="logo"
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <img alt="logo" itemProp="url" src={icon} />
            </span>
            <span itemProp="name">{author}</span>
          </span>
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

        <Segment className="segment--main" inverted={common.dark()}>
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
    </article>
  </Base>
);

export default Article;
