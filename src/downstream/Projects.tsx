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
`;

const HeaderWrapper = styled("div")`
  padding-bottom: 0.5em !important;
`;

interface IProject {
  title: string;
  link?: string;
  repoLink?: string;
  license: string;
  date: string;
  description: string;
  icon: SemanticICONS;
  color: SemanticCOLORS;
}

interface ICategory {
  title: string;
  icon: SemanticICONS;
  projects: IProject[];
}

interface IProjectsProps {
  projects: ICategory[];
}

const Project = styled("div")`
  width: ${1127 / 3 - (15 + 7.5)}px !important;
  @media (max-width: 1199px) {
    max-width: 100% !important;
    width: 100% !important;
  }
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  & .segment {
    padding: 2.5em !important;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.15);
    }
  }
  & a {
    color: white;
  }
`;

const CategoryHeader = styled("h2")`
  margin-top: 1em !important;
`;

const Projects = ({ projects }: IProjectsProps) => (
  <section id="projects">
    <ProjectsWrapper inverted={common.dark()}>
      <Container>
        <HeaderWrapper>
          <Icon name="database" /> <b>Featured Projects</b>
        </HeaderWrapper>
        {projects.map(({ title, icon, projects }, index) => (
          <div key={index}>
            <CategoryHeader>
              <Icon name={icon} /> {title}
            </CategoryHeader>
            <Gallery options={{ gutter: 30 }}>
              {projects.map(
                (
                  {
                    title,
                    link,
                    repoLink,
                    license,
                    date,
                    description,
                    icon,
                    ...otherProps
                  },
                  index
                ) => (
                  <Project key={index}>
                    <Segment {...otherProps} inverted>
                      <Header
                        as={link || repoLink ? Link : undefined}
                        to={link || repoLink || undefined}
                        size="huge"
                        inverted
                      >
                        <Header.Content>
                          <Icon name={icon} /> {title}
                        </Header.Content>
                        <Header.Subheader>{description}</Header.Subheader>
                      </Header>
                      <Icon name="calendar" />{" "}
                      {date.includes("(")
                        ? date
                        : new Date(date).toLocaleDateString()}
                      <br />
                      <Icon name="legal" /> {license}
                      {repoLink && (
                        <>
                          <br />
                          <Link to={repoLink}>
                            <>
                              <Icon name="git" /> Repository
                            </>
                          </Link>
                        </>
                      )}
                    </Segment>
                  </Project>
                )
              )}
            </Gallery>
          </div>
        ))}
      </Container>
    </ProjectsWrapper>
  </section>
);

export { Projects };
