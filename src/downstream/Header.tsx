import * as React from "react";
import {
  Grid,
  Header as HeaderTemplate,
  Image as ImageTemplate
} from "semantic-ui-react";
import { Button } from "@libresat/frontend-components";
import { Link } from "./Link";
import { common } from "../data/common";
import styled from "@emotion/styled";

interface IHeader {
  name: string;
  job: string;
  image: string;
  email: string;
  follow: string;
}

const Image = styled(ImageTemplate)`
  width: 100%;
  max-width: 200px !important;
  margin: 0 auto;
`;

const HeaderView = ({
  name,
  job,
  image,
  email,
  follow,
  ...otherProps
}: IHeader) => (
  <Grid stackable columns="equal" {...otherProps}>
    <Grid.Column textAlign="center" verticalAlign="middle">
      <HeaderTemplate as="h1" textAlign="center" inverted={common.dark}>
        <HeaderTemplate.Content>
          {name}
          <HeaderTemplate.Subheader>{job}</HeaderTemplate.Subheader>
        </HeaderTemplate.Content>
      </HeaderTemplate>
    </Grid.Column>
    <Grid.Column textAlign="center" verticalAlign="middle">
      <Image circular src={image} />
    </Grid.Column>
    <Grid.Column textAlign="center" verticalAlign="middle">
      <Link to={follow}>
        <Button content="Follow" icon="add" primary />
      </Link>
      <Link to={email}>
        <Button content="Contact" icon="mail" secondary={common.dark} />
      </Link>
    </Grid.Column>
  </Grid>
);

const Header = styled(HeaderView)`
  margin-top: 2.5em !important;
  margin-bottom: 2.5em !important;
`;

export { Header };
