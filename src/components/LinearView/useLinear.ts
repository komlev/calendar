import {
  addDays,
  getDate,
  getDay,
  getDaysInYear,
  getMonth,
  setYear,
  startOfYear,
} from "date-fns";
import { useMemo } from "preact/hooks";
import type { Day, Rows } from "../../types/day";
import { getDay as createDate, getDayId } from "../../utils/date";

export const useLinear = (year: number) => {
  const rows = useMemo(() => {
    const result: Rows = [];
    const daysNum = getDaysInYear(year);
    let date = startOfYear(setYear(new Date(), year));
    const startDay = getDay(date);
    const weeksNum = Math.ceil(daysNum / 7);

    let daysCount = 0;
    for (let i = 0; i < weeksNum; i++) {
      const week: (Day | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay - 1) || daysCount >= daysNum) {
          week.push(null);
          continue;
        }
        const day = getDate(date);
        const month = getMonth(date);

        daysCount++;
        week.push({
          id: getDayId(day, month, year),
          date: createDate(day, month, year),
        });
        date = addDays(date, 1);
      }
      result.push(week);
    }
    return result;
  }, [year]);

  return { rows };
};
