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
        "aspect-square h-6 w-6 cursor-pointer border-2 border-black outline-offset-1 outline-orange-500 focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-white",
        isSelected && "outline-2"
      )}
      style={{ backgroundColor, backgroundImage, borderRadius: "100%" }}
    />
  );
};
