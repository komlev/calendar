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
          "bg-base-100 relative text-xs font-medium",
          date !== undefined && "border border-neutral-300 text-center",
          isWeekend &&
            "border-[1.5px] border-red-200 bg-red-50 dark:border-stone-300 dark:bg-stone-700",
          isToday && "inset-ring-2 inset-ring-amber-600",
          isSelected && "inset-ring-2 inset-ring-blue-500"
        )}
      >
        {event && (
          <span
            style={{ backgroundColor: event ? colors?.[color] : undefined }}
            onClick={() => {
              onEditLabel(id);
            }}
            className={clsx(
              "font-bold text-black",
              "absolute top-0.5 left-0.5 z-30 h-6 min-w-6 cursor-pointer rounded-sm p-0.5 whitespace-nowrap ring-amber-600 hover:opacity-100 hover:ring-2",
              !label && "flex items-center justify-center opacity-0"
            )}
          >
            {!label && <EditIcon className="text-primary-content w-4" />}
            {label}
          </span>
        )}
        <button
          className="relative z-2 flex h-full w-full cursor-pointer items-end justify-end pr-0.5 pb-0.5"
          onMouseDown={onMouseDown}
          onKeyDown={onKeyboardClick}
        >
          <span
            className={clsx(
              "text-content rounded-sm px-0.5 font-semibold",
              isWeekend
                ? "bg-red-50 dark:bg-stone-700"
                : "dark:bg-base-100 bg-white"
            )}
          >
            {date.getDate()}
          </span>
        </button>
        {event && (
          <div
            className={clsx(
              "absolute top-0 left-0 z-1 h-full w-full",
              (isToday || isSelected) && "p-0.5"
            )}
          >
            <div className="h-full w-full" style={{ background }} />
          </div>
        )}
      </td>
    );
  }
);

CalendarCell.displayName = "CalendarCell";
