import clsx from "clsx";
import { isToday as getIsToday, isWeekend as getIsWeekend } from "date-fns";
import {
  memo,
  type DetailedHTMLProps,
  type FC,
  type KeyboardEvent,
  type MouseEventHandler,
  type TdHTMLAttributes,
} from "react";
import type { Event } from "../../store/calendar";
import {
  onCellDraw,
  onEditLabel,
  onEndDraw,
  onStartDraw,
} from "../../store/command";
import { colors, type Palette, type Pattern } from "../../style/colors";
import { getBackgroundProperty } from "../../utils/calendar";
import { EditIcon } from "../icons/EditIcon";

type Props = {
  id: string;
  date?: Date;
  isSelected?: boolean;
  event?: Event;
} & DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const CalendarCell: FC<Props> = memo(
  ({ id, date, isSelected, event, ...props }) => {
    if (!date) {
      return <td></td>;
    }

    const onMouseDown: MouseEventHandler = (e) => {
      if (e.button !== 2) {
        onStartDraw(id, e.shiftKey);
        document?.addEventListener("mouseup", onMouseUp);
      }
    };

    const onMouseUp = () => {
      onEndDraw();
    };

    const onMouseEnter = () => {
      onCellDraw(id);
    };

    const onKeyboardClick = (e: KeyboardEvent<HTMLButtonElement>) => {
      if ([" ", "enter"].includes(e.key?.toLowerCase())) {
        onStartDraw(id, e.shiftKey);
        document?.addEventListener("mouseup", onMouseUp);
        onEndDraw();

        if (e?.key?.toLowerCase() === "enter") {
          onEditLabel(id);
        }
      }
    };

    const [color = "red", pattern = "solid"] = (event?.type?.split(".") ||
      []) as [Palette, Pattern];
    const background = getBackgroundProperty(color, pattern);
    const isToday = getIsToday(date);
    const isWeekend = getIsWeekend(date);
    const label = event?.label;

    return (
      <td
        {...props}
        role="gridcell"
        onMouseEnter={onMouseEnter}
        className={clsx(
          props.className,
          "text-xs relative font-medium bg-base-100",
          date !== undefined && "text-center border border-neutral-300",
          isWeekend &&
            "bg-red-50 dark:bg-stone-700 border-[1.5px] border-red-200 dark:border-stone-300",
          isToday && "inset-ring-2 inset-ring-amber-600",
          isSelected && "inset-ring-2 inset-ring-blue-500",
        )}
      >
        {event && (
          <span
            style={{ backgroundColor: event ? colors?.[color] : undefined }}
            onClick={() => {
              onEditLabel(id);
            }}
            className={clsx(
              "text-black font-bold",
              "min-w-6 h-6 top-0.5 left-0.5 z-30 rounded-sm absolute whitespace-nowrap p-0.5 cursor-pointer hover:ring-2 ring-amber-600 hover:opacity-100",
              !label && "opacity-0 flex items-center justify-center",
            )}
          >
            {!label && <EditIcon className="w-4 text-primary-content" />}
            {label}
          </span>
        )}
        <button
          className="cursor-pointer w-full h-full flex relative z-2 items-end justify-end pr-0.5 pb-0.5"
          onMouseDown={onMouseDown}
          onKeyDown={onKeyboardClick}
        >
          <span
            className={clsx(
              "rounded-sm px-0.5 text-content font-semibold",
              isWeekend
                ? "bg-red-50 dark:bg-stone-700"
                : "bg-white dark:bg-base-100",
            )}
          >
            {date.getDate()}
          </span>
        </button>
        {event && (
          <div
            className={clsx(
              "absolute top-0 left-0 w-full h-full z-1",
              (isToday || isSelected) && "p-0.5",
            )}
          >
            <div className="w-full h-full" style={{ background }} />
          </div>
        )}
      </td>
    );
  },
);

CalendarCell.displayName = "CalendarCell";
