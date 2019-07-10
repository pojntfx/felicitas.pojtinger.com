import favicon from "../assets/icon-circle.webp";
import backgroundLight from "../assets/bg.webp";
import backgroundDark from "../assets/bg-dark.webp";
import {
  title,
  shortTitle,
  author,
  site,
  language,
  color,
  colorDark
} from "./metadata.json";

const isNight = () => new Date().getHours() >= 20;

const common = {
  title,
  shortTitle,
  author,
  site,
  language,
  color: () => (isNight() ? colorDark : color),
  colorDark,
  colorLight: color,
  favicon,
  background: () => (isNight() ? backgroundDark : backgroundLight),
  dark: () => isNight()
};

export { common };
