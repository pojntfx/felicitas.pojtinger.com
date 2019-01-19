import * as React from "react";
import { Segment, Container } from "semantic-ui-react";
import { ArticlesList } from "./ArticlesList";
import styled from "@emotion/styled-base";
import { common } from "../data/common";

const ArticlesWrapper = styled(Segment)`
  border-radius: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const HeaderWrapper = styled(Container)``;

const Articles = () => (
  <section id="articles">
    <ArticlesWrapper inverted={common.dark}>
      <HeaderWrapper>
        <b>Latest Articles</b>
      </HeaderWrapper>
      <ArticlesList />
    </ArticlesWrapper>
  </section>
);

export { Articles };
