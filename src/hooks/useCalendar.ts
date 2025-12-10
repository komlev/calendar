import { useStore } from "@nanostores/preact";
import { $calendar } from "../store/calendar";

export const useCalendar = () => {
  const calendar = useStore($calendar);
  return calendar;
};
