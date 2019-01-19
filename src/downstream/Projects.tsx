import * as React from "react";
import {
  Segment,
  Container,
  Header,
  SemanticICONS,
  Icon
} from "semantic-ui-react";
import styled from "@emotion/styled-base";
import { common } from "../data/common";
import { Link } from "./Link";
import Gallery from "react-masonry-component";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

const ProjectsWrapper = styled(Segment)`
  border-radius: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
`;

const HeaderWrapper = styled("div")`
  padding-bottom: 0.5em !important;
`;

interface IProjects {
  projects: {
    title: string;
    description: string;
    link: string;
    icon: SemanticICONS;
    color: SemanticCOLORS;
  }[];
}

const Project = styled(Link)`
  width: ${1127 / 3 - (15 + 7.5)}px !important;
  @media (max-width: 1199px) {
    max-width: 100% !important;
    width: 100% !important;
  }
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  & .segment {
    padding: 2.5em !important;
  }
`;

const Projects = ({ projects }: IProjects) => (
  <section id="projects">
    <ProjectsWrapper inverted={common.dark}>
      <Container>
        <HeaderWrapper>
          <b>Featured Projects</b>
        </HeaderWrapper>
        <Gallery options={{ gutter: 30 }}>
          {projects.map(
            ({ title, description, icon, link, ...otherProps }, index) => (
              <Project to={link} key={index}>
                <Segment {...otherProps} fluid inverted>
                  <Header size="huge" inverted>
                    <Header.Content>
                      <Icon name={icon} /> {title}
                    </Header.Content>
                    <Header.Subheader>{description}</Header.Subheader>
                  </Header>
                </Segment>
              </Project>
            )
          )}
        </Gallery>
      </Container>
    </ProjectsWrapper>
  </section>
);

export { Projects };
