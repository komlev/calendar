import clsx from "clsx";
import { memo, type DetailedHTMLProps, type FC } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { useCommand } from "../../hooks/useCommand";
import { DAYS_NAMES } from "../../utils/date";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import { useMonth } from "./useMonth";

type Props = {
  year: number;
  month: number;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const MonthsItem: FC<Props> = memo(({ month, year, ...props }) => {
  const { rows, monthName } = useMonth(month, year);
  const command = useCommand();
  const calendar = useCalendar();

  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col rounded-lg shadow-sm p-4 bg-base-100",
        // style.MonthItem,
        // style[getMonthType(month)],
        props.className,
      )}
    >
      <div className="px-1 text-red-500 font-bold text-sm text-end border-b border-neutral-400">
        {monthName}
      </div>
      <table role="grid">
        <thead>
          <tr>
            {DAYS_NAMES.map((name, index) => (
              <th
                key={`${name}_${index}`}
                className={clsx(
                  "p-1 text-center font-bold text-sm aspect-square",
                  index >= 5 && "text-neutral-500",
                )}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((data, dayIndex) => {
                const { id, date } = data || {};
                return (
                  <CalendarCell
                    id={id!}
                    key={`${rowIndex}_${dayIndex}`}
                    date={date}
                    isSelected={id === command.selected}
                    event={calendar?.[id!]}
                    className="w-15 h-15"
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
