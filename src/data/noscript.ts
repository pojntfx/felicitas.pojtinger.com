import { common } from "./common";
import { footer } from "./footer";

const noscript = {
  title: "ECMAScript/JavaScript not enabled",
  text: `Please enable ECMAScript/JavaScript in your browser to view the ${
    common.title
  } Site properly.
    It's ${
      footer.legal.licenses[1].spdxLicenseIdentifier
    } licensed Free/Libre and Open Source Software.`
};

export { noscript };
