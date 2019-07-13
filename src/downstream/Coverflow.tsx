import * as React from "react";
import styled from "@emotion/styled";
import * as CoverflowTemplate from "reactjs-coverflow";
import { CardProps } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import Image from "gatsby-image";
import { Link } from "./Link";

interface ICoverflowProps {
  items: ICoverflowItemProps[] & CardProps;
  linkComponent: JSX.Element;
}

interface ICoverflowItemProps {
  link?: string;
}

const CoverflowItemTemplate = styled(Card)`
  margin-top: 1em !important;
  margin-bottom: 1em !important;
`;

const CoverflowWrapper = styled(CoverflowTemplate as React.ComponentClass<
  ICoverflowProps
>)`
  margin-top: 1em;
  margin-bottom: 1em;
  background: transparent;
`;

const CoverflowItem = ({
  image,
  header,
  meta,
  description,
  ...otherProps
}: ICoverflowItemProps & CardProps) => (
  <CoverflowItemTemplate as={Link} {...otherProps}>
    <Image fluid={image as any} />
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </CoverflowItemTemplate>
);

const Coverflow = ({
  items,
  linkComponent,
  ...otherProps
}: ICoverflowProps) => (
  <CoverflowWrapper rotate={10} {...otherProps}>
    {items.map(({ link, ...props }, index) => (
      <CoverflowItem {...props} as={linkComponent} to={link} key={index} />
    ))}
  </CoverflowWrapper>
);

export { Coverflow, CoverflowItem };
