import * as React from "react";
import { Grid, Header as HeaderTemplate } from "semantic-ui-react";
import { Button } from "@libresat/frontend-components";
import { Link } from "./Link";
import { common } from "../data/common";
import styled from "@emotion/styled";
import ImageTemplate from "gatsby-image";

interface IHeader {
  name: string;
  job: string;
  image: any;
  email: string;
  follow: string;
}

const Image = styled(ImageTemplate)`
  width: 100%;
  max-width: 200px !important;
  margin: 0 auto;
  border-radius: 50%;
`;

const HeaderView = ({
  name,
  job,
  image,
  email,
  follow,
  ...otherProps
}: IHeader) => (
  <section id="header">
    <Grid stackable columns="equal" {...otherProps}>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <HeaderTemplate as="h1" textAlign="center" inverted>
          <HeaderTemplate.Content>
            <span itemProp="name">{name}</span>
            <HeaderTemplate.Subheader itemProp="jobTitle">
              {job}
            </HeaderTemplate.Subheader>
          </HeaderTemplate.Content>
        </HeaderTemplate>
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Image fluid={image} />
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Link to={follow}>
          <Button content="Follow" icon="add" primary />
        </Link>
        <Link to={`mailto:${email}`}>
          <span style={{ display: "none" }} itemProp="email">
            {email}
          </span>
          <Button content="Contact" icon="mail" secondary={common.dark()} />
        </Link>
      </Grid.Column>
    </Grid>
  </section>
);

const Header = styled(HeaderView)`
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
  & .button {
    &:first-of-type {
      margin-right: 1em !important;
    }
    transition: all 0.2s ease-in-out !important;
    &:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
        0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;
    }
  }
`;

export { Header };