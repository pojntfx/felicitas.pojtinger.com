import favicon from "../assets/icon.png";
import backgroundLight from "../assets/bg.jpg";
import backgroundDark from "../assets/bg-dark.jpg";
import {
  title,
  shortTitle,
  author,
  site,
  language,
  color
} from "./metadata.json";

const common = {
  title,
  shortTitle,
  author,
  site,
  language,
  color,
  favicon,
  background: new Date().getHours() < 16 ? backgroundLight : backgroundDark,
  dark: new Date().getHours() < 16 ? false : true
};

export { common };
