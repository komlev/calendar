import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isSelected?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
};

export const PaletteBtn: FC<Props> = ({
  isSelected,
  backgroundColor,
  backgroundImage,
  ...props
}) => {
  return (
    <button
      {...props}
      role="button"
      className={clsx(
        props.className,
        "border-2 border-black dark:border-white w-6 h-6 outline-offset-1 outline-orange-500 cursor-pointer aspect-square focus-visible:outline-blue-500 focus-visible:outline-2",
        isSelected && "outline-2",
      )}
      style={{ backgroundColor, backgroundImage, borderRadius: "100%" }}
    />
  );
};
