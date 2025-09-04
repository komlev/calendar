import { colors, patterns, type Palette, type Pattern } from "../style/colors";

export const getEventId = (color: Palette, pattern: Pattern) =>
  `${color}.${pattern}`;

export const getBackgroundProperty = (color: Palette, pattern: Pattern) => {
  const bgColor = colors[color] || colors.red;
  const bgPattern = pattern !== "solid" ? patterns[pattern] : null;
  return pattern === "solid"
    ? bgColor
    : bgPattern
        ?.replaceAll("currentColor", bgColor)
        .replaceAll("currentOpacity", "1");
};
