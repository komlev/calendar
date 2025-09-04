import { persistentAtom } from "@nanostores/persistent";
import { toMerged } from "es-toolkit";
import isEmpty from "es-toolkit/compat/isEmpty";
import omitBy from "es-toolkit/compat/omitBy";

export type Event = {
  type: string;
  label?: string;
};

type Calendar = {
  [key: string]: Event;
};

export const $calendar = persistentAtom<Calendar>(
  "calendar",
  {},
  { encode: JSON.stringify, decode: JSON.parse }
);

const shouldOmit = (value: Event) => !value || isEmpty(value);

export const toggleEvent = (type: string, dayId: string) => {
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
  const newData = JSON.parse(data);

  $calendar.set(toMerged(prevDate, newData));
};

export const getCalendarCell = (dayId: string) => {
  const calendar = $calendar.get();
  return calendar[dayId];
};
