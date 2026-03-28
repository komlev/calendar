import { persistentAtom } from "@nanostores/persistent";
import { toMerged } from "es-toolkit";
import isEmpty from "es-toolkit/compat/isEmpty";
import omitBy from "es-toolkit/compat/omitBy";
import type { Palette, Pattern } from "../style/colors";

export type EventType = `${Palette}.${Pattern}`;

export type Event = {
  type: EventType;
  label?: string;
};

type Calendar = {
  [key: string]: Event;
};

export const $calendar = persistentAtom<Calendar>(
  "calendar",
  {},
  { encode: JSON.stringify, decode: JSON.parse },
);

const shouldOmit = (value: Event) => !value || isEmpty(value);

export const toggleEvent = (type: EventType, dayId: string) => {
  const prev = $calendar.get();
  let event: Event = prev[dayId];

  if (event?.type === type) {
    event = {} as Event;
  } else {
    event = { ...(event || {}), type: type };
  }

  $calendar.set(omitBy({ ...prev, [dayId]: event }, shouldOmit));
};

export const labelEvent = (dayId: string, label: string) => {
  const prev = $calendar.get();
  let event: Event = prev[dayId];

  if (event?.type) {
    event = { ...event, label };
  }

  $calendar.set(omitBy({ ...prev, [dayId]: event }, shouldOmit));
};

export const clearCalendar = () => {
  $calendar.set({});
};

export const exportCalendar = () => {
  const calendar = $calendar.get();
  return JSON.stringify(calendar);
};

export const importCalendar = (data: string) => {
  const prevDate = $calendar.get();
  const newData: unknown = JSON.parse(data);

  if (
    typeof newData !== "object" ||
    newData === null ||
    Array.isArray(newData)
  ) {
    throw new Error("Invalid calendar data: expected a JSON object");
  }

  $calendar.set(toMerged(prevDate, newData as Calendar));
};

export const getCalendarCell = (dayId: string) => {
  const calendar = $calendar.get();
  return calendar[dayId];
};
