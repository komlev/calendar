import { persistentAtom } from "@nanostores/persistent";
import type { Palette, Pattern } from "../style/colors";

export type Tab = "Months" | "Linear" | "Columns";
export const Tabs: Tab[] = ["Months", "Linear", "Columns"];

type Settings = {
  color: Palette;
  pattern: Pattern;
  tab: Tab;
  year: number;
  help: boolean;
};

export const DEFAULTS: Settings = {
  color: "red",
  pattern: "solid",
  tab: Tabs[0],
  year: new Date().getFullYear(),
  help: true,
};

export const $settings = persistentAtom<Settings>("settings", DEFAULTS, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

const updateSetting =
  <K extends keyof Settings>(key: K) =>
  (value: Settings[K]) =>
    $settings.set({ ...$settings.get(), [key]: value });

export const onColorPick = updateSetting("color");
export const onPatternPick = updateSetting("pattern");
export const onTabChange = updateSetting("tab");
export const onYearChange = updateSetting("year");
export const onHelp = updateSetting("help");
