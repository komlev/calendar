import clsx from "clsx";
import type { DetailedHTMLProps, FC } from "preact/compat";
import { MonthsItem } from "./MonthItem";

const MONTH_INDEXES = Array.from({ length: 12 }, (_, i) => i);

type Props = { year: number } & DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const MonthsView: FC<Props> = ({ year, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-wrap justify-center gap-4 print:gap-2",
        props.className,
      )}
    >
      {MONTH_INDEXES.map((index) => (
        <MonthsItem key={index} month={index} year={year} />
      ))}
    </div>
  );
};
