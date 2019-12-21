import * as React from "react";
import { Segment, Container, Icon } from "semantic-ui-react";
import { ArticlesList } from "./ArticlesList";
import styled from "@emotion/styled-base";
import { common } from "../data/common";

const ArticlesWrapper = styled(Segment)`
  border-radius: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  & .card {
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;
    }
  }
`;

const HeaderWrapper = styled(Container)``;

const Articles = () => (
  <section id="articles">
    <ArticlesWrapper inverted={common.dark()}>
      <HeaderWrapper>
        <Icon name="newspaper" /> <b>Latest Articles</b>
      </HeaderWrapper>
      <ArticlesList />
    </ArticlesWrapper>
  </section>
);

export { Articles };
