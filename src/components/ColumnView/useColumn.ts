import { getDaysInMonth, setMonth, setYear } from "date-fns";
import { useMemo } from "react";
import type { Rows } from "../../types/day";
import { getDay, getDayIdByDate } from "../../utils/date";

export const useColumn = (year: number) => {
  const rows: Rows = useMemo(() => {
    const daysInMonths = new Array(12).fill(0).map((_, month) => {
      const date = setYear(setMonth(new Date(), month), year);
      return getDaysInMonth(date);
    });

    return new Array(31).fill(0).map((_, day) => {
      return new Array(12).fill(0).map((_, month) => {
        if (daysInMonths[month] > day) {
          const date = getDay(day + 1, month, year);
          return {
            id: getDayIdByDate(date),
            date,
          };
        }
        return null;
      });
    });
  }, [year]);

  return { rows };
};
