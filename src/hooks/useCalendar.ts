import { useStore } from "@nanostores/react";
import { $calendar } from "../store/calendar";

export const useCalendar = () => {
  const calendar = useStore($calendar);
  return calendar;
};
