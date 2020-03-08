import favicon from "../assets/avatars/avatar-circular.png";
import backgroundLight from "../assets/backgrounds/bg.jpg";
import backgroundDark from "../assets/backgrounds/bg-dark.jpg";
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
  // This is now hard-coded to use backgrounds/{bg.jpg,bg-dark.jpg}
  background: () => (isNight() ? backgroundDark : backgroundLight),
  dark: () => isNight()
};

export { common };
