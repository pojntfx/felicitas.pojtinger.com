import * as React from "react";
import { PageNotFound, Head } from "@libresat/frontend-components";
import { withPrefix } from "gatsby";
import { Link } from "../downstream/Link";
import pageNotFoundImage from "../assets/404-rabbit.png";

const PageNotFoundPage = () => (
  <PageNotFound
    image={pageNotFoundImage}
    homeLink={withPrefix("/")}
    linkComponent={Link as any}
    headComponent={title => <Head title={title} />}
  />
);

export default PageNotFoundPage;
