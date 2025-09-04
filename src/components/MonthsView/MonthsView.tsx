import clsx from "clsx";
import type { DetailedHTMLProps, FC } from "react";
import { MonthsItem } from "./MonthItem";

type Props = { year: number } & DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const MonthsView: FC<Props> = ({ year, ...props }) => {
  return (
    <div
      {...props}
      className={clsx("flex justify-center flex-wrap gap-4", props.className)}
    >
      {new Array(12).fill(0).map((_, index) => (
        <MonthsItem key={index} month={index} year={year} />
      ))}
    </div>
  );
};
