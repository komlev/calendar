import clsx from "clsx";
import {
  format,
  isToday as getIsToday,
  isWeekend as getIsWeekend,
} from "date-fns";
import {
  type DetailedHTMLProps,
  type FC,
  type KeyboardEvent,
  type MouseEventHandler,
  memo,
  type TdHTMLAttributes,
  type TouchEvent,
  useRef,
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
import { getIsMobile } from "../../utils/device";
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
    const longPress = useRef<number | undefined>(undefined);

    if (!date) {
      return <td></td>;
    }

    const onMouseDown: MouseEventHandler = (e) => {
      if (e.button !== 2) {
        onStartDraw(id, e.shiftKey);
        const onMouseUp = () => {
          document?.removeEventListener("mouseup", onMouseUp);
          if (longPress.current !== undefined) {
            clearTimeout(longPress.current);
          }
          onEndDraw();
        };

        document?.addEventListener("mouseup", onMouseUp);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const onTouchEnd = () => {
          document?.removeEventListener("touchend", onTouchEnd);
          if (longPress.current !== undefined) {
            clearTimeout(longPress.current);
          }
        };

        document?.addEventListener("touchend", onTouchEnd);

        if (
          getIsMobile() &&
          e.touches[0].clientX === e.changedTouches[0].clientX
        ) {
          if (longPress.current !== undefined) {
            clearTimeout(longPress.current);
          }
          // Use window.setTimeout to ensure number type in browsers
          const scrollYStart = window.scrollY;
          longPress.current = window.setTimeout(() => {
            // detect drift: if the user has moved their finger too far
            if (Math.abs(scrollYStart - window.scrollY) < 20) {
              onEditLabel(id, !event);
            }
          }, 600);
        }
      }
    };

    const onMouseEnter = () => {
      onCellDraw(id);
    };

    const onKeyboardClick = (e: KeyboardEvent<HTMLButtonElement>) => {
      if ([" ", "enter"].includes(e.key?.toLowerCase())) {
        onStartDraw(id, e.shiftKey);
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
      // biome-ignore lint/a11y/useAriaPropsSupportedByRole: skipping for now
      <td
        {...props}
        aria-selected={isSelected ? true : undefined}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        data-today={isToday ? "true" : undefined}
        className={clsx(
          props.className,
          "bg-base-100 relative text-xs font-medium",
          date !== undefined && "border border-neutral-300 text-center",
          isWeekend &&
            "border-[1.5px] border-red-200 bg-red-50 dark:border-stone-300 dark:bg-stone-700",
          isToday && "inset-ring-2 inset-ring-amber-600 print:inset-ring-0",
          isSelected && "inset-ring-2 inset-ring-blue-500 print:inset-ring-0",
        )}
      >
        {event && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: skipping for now
          // biome-ignore lint/a11y/noStaticElementInteractions: skipping for now
          <span
            style={{ backgroundColor: label ? colors?.[color] : undefined }}
            onClick={() => {
              if (!getIsMobile()) {
                onEditLabel(id);
              }
            }}
            className={clsx(
              "font-bold text-black",
              "absolute top-0.5 left-0.5 z-30 h-6 min-w-6 cursor-pointer rounded-sm p-0.5 whitespace-nowrap ring-amber-600 hover:opacity-100 hover:ring-2",
              !label &&
                "dark:bg-base-100 hidden items-center justify-center bg-white opacity-0 md:flex",
            )}
          >
            {!label && <EditIcon className="text-base-content w-4" />}
            {label}
          </span>
        )}
        <button
          type="button"
          className="relative z-2 flex h-full w-full cursor-pointer items-end justify-end pr-0.5 pb-0.5"
          onMouseDown={onMouseDown}
          onKeyDown={onKeyboardClick}
          aria-label={`${format(date, "EEEE, MMMM d, yyyy")}${label ? `: ${label}` : ""}`}
        >
          <span
            className={clsx(
              "text-content rounded-sm px-0.5 font-semibold",
              isWeekend
                ? "bg-red-50 dark:bg-stone-700"
                : "dark:bg-base-100 bg-white",
            )}
          >
            {date.getDate()}
          </span>
        </button>
        {event && (
          <div
            className={clsx(
              "absolute top-0 left-0 z-1 h-full w-full",
              (isToday || isSelected) && "p-0.5",
            )}
          >
            <div className="h-full w-full" style={{ background }} />
          </div>
        )}
      </td>
    );
  },
);

CalendarCell.displayName = "CalendarCell";
