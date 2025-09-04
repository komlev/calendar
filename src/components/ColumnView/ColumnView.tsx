import type { FC } from "react";
import { useCommand } from "../../hooks/useCommand";
import { MONTHS_NAMES } from "../../utils/date";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import { useColumn } from "./useColumn";
import { useCalendar } from "../../hooks/useCalendar";

type Props = {
  year: number;
};

export const ColumnView: FC<Props> = ({ year }) => {
  const { rows } = useColumn(year);
  const command = useCommand();
  const calendar = useCalendar();

  return (
    <div className="flex overflow-x-auto">
      <table role="grid" className="w-full">
        <thead>
          <tr>
            {MONTHS_NAMES.map((name, index) => (
              <th
                key={`${name}_${index}`}
                className="p-1 text-center text-red-600 font-bold text-sm"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((data, cellIndex) => {
                  const { id, date } = data || {};
                  return (
                    <CalendarCell
                      id={id!}
                      key={`${id}_${cellIndex}`}
                      date={date}
                      isSelected={id === command.selected}
                      event={calendar?.[id!]}
                      className="h-8"
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
