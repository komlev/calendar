import { persistentAtom } from "@nanostores/persistent";
import type { Palette, Pattern } from "../style/colors";

type Tab = "Months" | "Linear" | "Columns";
export const Tabs: Tab[] = ["Months", "Linear", "Columns"];

type Settings = {
  color: Palette;
  pattern: Pattern;
  tab: Tab;
  year: number;
};

export const DEFAULTS: Settings = {
  color: "red",
  pattern: "solid",
  tab: Tabs[0],
  year: new Date().getFullYear(),
};

export const $settings = persistentAtom<Settings>("settings", DEFAULTS, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const onColorPick = (color: Palette) => {
  const value = $settings.get();
  $settings.set({ ...value, color });
};

export const onPatternPick = (pattern: Pattern) => {
  const value = $settings.get();
  $settings.set({ ...value, pattern });
};

export const onTabChange = (tab: Tab) => {
  const value = $settings.get();
  $settings.set({ ...value, tab });
};

export const onYearChange = (year: number) => {
  const value = $settings.get();
  $settings.set({ ...value, year });
};
