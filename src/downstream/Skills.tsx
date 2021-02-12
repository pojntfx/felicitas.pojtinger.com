import * as React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { common } from "../data/common";
import styled from "@emotion/styled";
import { Link } from "./Link";

interface ISkills {
  description: string;
  descriptionLink: string;
  languages: string[];
  languagesLink: string;
  tech: string[];
  techLink: string;
}

const SkillsTemplate = ({
  description,
  descriptionLink,
  languages,
  languagesLink,
  tech,
  techLink,
  ...otherProps
}: ISkills) => (
  <section id="skills">
    <Segment inverted={common.dark()} {...otherProps}>
      <Grid columns="equal">
        <Grid.Row columns={2} as={Link} to={descriptionLink}>
          <Grid.Column width={2} textAlign="center" verticalAlign="middle">
            <Icon inverted={common.dark()} name="hand spock" size="big" />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <b>Hi! </b> <span itemProp="description">{description}</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} as={Link} to={languagesLink}>
          <Grid.Column width={2} textAlign="center" verticalAlign="middle">
            <Icon inverted={common.dark()} name="code" size="big" />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            I code in{" "}
            <span itemProp="knowsAbout">
              {languages
                .filter((_, index) => index !== languages.length - 1)
                .join(", ")}{" "}
              and {languages[languages.length - 1]}.
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} as={Link} to={techLink}>
          <Grid.Column width={2} textAlign="center" verticalAlign="middle">
            <Icon inverted={common.dark()} name="osi" size="big" />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            I love{" "}
            {tech.filter((_, index) => index !== tech.length - 1).join(", ")}{" "}
            and {tech[tech.length - 1]}.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </section>
);

const Skills = styled(SkillsTemplate)`
  max-width: 400px !important;
  margin: 0 auto !important;
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
  & > .grid > .column {
    transition: all 0.2s ease-in-out !important;
    color: inherit !important;
    &:hover {
      background: ${common.colorLight};
      ${!common.dark() && `color: rgba(255, 255, 255, 0.9)!important;`}
      border-radius: 0.28571429rem;
      transform: scale(1.05) !important;
      box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;
    }
  }
`;

export { Skills };
