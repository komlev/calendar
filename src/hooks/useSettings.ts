import { useStore } from "@nanostores/preact";
import { $settings, DEFAULTS } from "../store/settings";

export const useSettings = () => {
  const settings = useStore($settings);
  return { ...DEFAULTS, ...settings };
};
