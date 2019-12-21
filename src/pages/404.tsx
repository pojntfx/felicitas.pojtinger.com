import * as React from "react";
import { PageNotFound, Head } from "@libresat/frontend-components";
import { Link } from "../downstream/Link";
import pageNotFoundImage from "../assets/backgrounds/404-rabbit.webp";
import { Base } from "../downstream/Base";
import { pageNotFound } from "../data/404";

const PageNotFoundPage = () => (
  <Base
    head={{
      ...pageNotFound.head
    }}
    background={pageNotFound.background}
    noBackButton
  >
    <PageNotFound
      image={pageNotFoundImage}
      homeLink={"/"}
      linkComponent={Link as any}
      headComponent={title => <Head title={title} />}
    />
  </Base>
);

export default PageNotFoundPage;
