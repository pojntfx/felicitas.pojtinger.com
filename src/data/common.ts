import favicon from "../assets/icon.png";
import backgroundLight from "../assets/bg.jpg";
import backgroundDark from "../assets/bg-dark.jpg";
import {
  title,
  shortTitle,
  author,
  site,
  language,
  color,
  colorDark
} from "./metadata.json";

const isNight = () => (new Date().getHours() < 16 ? false : true);

const common = {
  title,
  shortTitle,
  author,
  site,
  language,
  color: isNight() ? colorDark : color,
  favicon,
  background: isNight() ? backgroundDark : backgroundLight,
  dark: isNight()
};

export { common };
