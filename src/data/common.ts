import favicon from "../assets/icon-circle.png";
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

const isNight = () => new Date().getHours() >= 17;

const common = {
  title,
  shortTitle,
  author,
  site,
  language,
  color: isNight() ? colorDark : color,
  colorDark,
  colorLight: color,
  favicon,
  background: isNight() ? backgroundDark : backgroundLight,
  dark: isNight()
};

export { common };
