import clsx from "clsx";
import { Fragment, type FC } from "react";
import { useCommand } from "../../hooks/useCommand";
import { DAYS_NAMES, MONTHS_NAMES } from "../../utils/date";
import { CalendarCell } from "../CalendarCell/CalendarCell";
import { useLinear } from "./useLinear";
import { useCalendar } from "../../hooks/useCalendar";

type Props = {
  year: number;
};

export const LinearView: FC<Props> = ({ year }) => {
  const { rows } = useLinear(year);
  const command = useCommand();
  const calendar = useCalendar();

  let m = -1;
  let shown = -1;
  return (
    <div className="flex">
      <table role="grid" className="w-full">
        <thead>
          <tr>
            <th></th>
            {DAYS_NAMES.map((name, index) => (
              <th
                key={`${name}_${index}`}
                className="p-1 text-center text-red-600 font-bold text-sm w-1/8"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border border-gray-200 bg-base-100">
          {rows?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((data, dayIndex) => {
                  const { id, date } = data || {};
                  let showMonth = false;
                  const month = date?.getMonth();
                  if (month !== m && dayIndex === 0) {
                    m = Math.max(m, month || 0);
                    showMonth = shown < m;
                    if (shown < m) {
                      shown++;
                    }
                  }

                  return (
                    <Fragment key={`${rowIndex}_${dayIndex}`}>
                      {dayIndex === 0 && (
                        <td
                          className={clsx(
                            "p-1 text-center text-red-600 font-bold text-sm border-x border-gray-200",
                            showMonth && "border-t",
                          )}
                        >
                          {showMonth ? MONTHS_NAMES[m] : ""}
                        </td>
                      )}
                      <CalendarCell
                        id={id!}
                        date={date}
                        isSelected={
                          !!command.selected && id === command.selected
                        }
                        event={calendar?.[id!]}
                        className="h-10"
                      />
                    </Fragment>
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
