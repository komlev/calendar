import {
  format,
  getDay,
  getDaysInMonth,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";
import type { Rows } from "../../types/day";
import { getDay as createDay, getDayId } from "../../utils/date";

export const useMonth = (month: number, year: number) => {
  const [startDay, numberOfDays, monthName] = useMemo(() => {
    const date = setMonth(setYear(new Date(), year), month);
    const start = getDay(startOfMonth(date));
    return [
      // Sunday is 0
      start === 0 ? 7 : start,
      getDaysInMonth(date),
      format(date, "MMMM"),
    ];
  }, [month, year]);

  const rows = useMemo(() => {
    const rows: Rows = [];
    let day = 1;
    if (startDay !== 1) {
      const firstRow = [];
      for (let i = 0; i < 7; i++) {
        if (i < startDay - 1) {
          firstRow.push(null);
        } else {
          firstRow.push({
            id: getDayId(day, month, year),
            date: createDay(day, month, year),
          });
          day++;
        }
      }
      rows.push(firstRow);
    }

    while (day <= numberOfDays) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        if (day <= numberOfDays) {
          row.push({
            id: getDayId(day, month, year),
            date: createDay(day, month, year),
          });
          day++;
        }
      }
      rows.push(row);
    }
    return rows;
  }, [startDay, numberOfDays, month, year]);

  return {
    monthName,
    rows,
  };
};
