import { useStore } from "@nanostores/react";
import { $settings } from "../store/settings";

export const useSettings = () => {
  const settings = useStore($settings);
  return settings;
};
