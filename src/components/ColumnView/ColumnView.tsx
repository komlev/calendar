import type { FC } from "react";
import { useCommand } from "../../hooks/useCommand";
import { MONTHS_NAMES } from "../../utils/date";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import { useColumn } from "./useColumn";
import { useCalendar } from "../../hooks/useCalendar";
import { padString } from "../../utils/string";

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
                className="p-1 text-center text-sm font-bold whitespace-nowrap text-red-600"
              >
                {padString(name, 10, " ")}
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
                      className="h-10"
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
