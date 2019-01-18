import * as React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { common } from "../data/common";
import styled from "@emotion/styled";

interface ISkills {
  description: string;
  languages: string[];
  tech: string[];
}

const SkillsTemplate = ({
  description,
  languages,
  tech,
  ...otherProps
}: ISkills) => (
  <Segment inverted={common.dark} {...otherProps}>
    <Grid columns="equal">
      <Grid.Row columns={2}>
        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
          <Icon inverted={common.dark} name="hand spock" size="big" />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <b>Hi!</b> {description}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
          <Icon inverted={common.dark} name="code" size="big" />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          I code{" "}
          {languages
            .filter((_, index) => index !== languages.length - 1)
            .join(", ")}{" "}
          and {languages[languages.length - 1]}.
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
          <Icon inverted={common.dark} name="osi" size="big" />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          I love{" "}
          {tech.filter((_, index) => index !== tech.length - 1).join(", ")} and{" "}
          {tech[tech.length - 1]}.
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const Skills = styled(SkillsTemplate)`
  max-width: 400px !important;
  margin: 0 auto !important;
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
`;

export { Skills };
