import {
  format,
  startOfMonth,
  startOfWeek,
  startOfDay,
  setYear,
  setMonth,
  setDate,
} from "date-fns";

export const DAYS_NAMES = Array.from({ length: 7 }, (_, i) => {
  const date = startOfWeek(new Date(), { weekStartsOn: 1 });
  date.setDate(date.getDate() + i);
  return format(date, "EEE");
});

export const MONTHS_NAMES = Array.from({ length: 12 }, (_, i) => {
  const date = startOfMonth(new Date());
  // pick middle of the month
  date.setDate(15);
  date.setMonth(i);
  return format(date, "MMMM");
});

export const getDayId = (day: number, month: number, year: number) =>
  `${day}.${month}.${year}`;

export const getDayIdByDate = (date: Date) => {
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];
  return getDayId(day, month, year);
};

export const getDay = (day: number, month: number, year: number) => {
  return startOfDay(setDate(setMonth(setYear(new Date(), year), month), day));
};

// month zero based
export const getMonthType = (_month: number) => {
  const month = _month + 1;
  if (month >= 3 && month < 6) return "spring";
  if (month >= 6 && month < 9) return "summer";
  if (month >= 9 && month < 12) return "autumn";
  return "winter";
};

export type MONTH_TYPE = ReturnType<typeof getMonthType>;
