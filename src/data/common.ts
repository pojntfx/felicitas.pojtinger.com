import favicon from "../../static/img/avatars/avatar-circular.webp";
import backgroundLight from "../../static/img/backgrounds/bg.png";
import backgroundDark from "../../static/img/backgrounds/bg-dark.png";
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
  // This is now hard-coded to use backgrounds/{bg.webp,bg-dark.webp}
  background: () => (isNight() ? backgroundDark : backgroundLight),
  dark: () => isNight()
};

export { common };
