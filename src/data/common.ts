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

const prefersDarkMode = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const common = {
  title,
  shortTitle,
  author,
  site,
  language,
  color: () => (prefersDarkMode() ? colorDark : color),
  colorDark,
  colorLight: color,
  favicon,
  // This is now hard-coded to use backgrounds/{bg.jpg,bg-dark.jpg}
  background: () => (prefersDarkMode() ? backgroundDark : backgroundLight),
  dark: () => prefersDarkMode()
};

export { common };
