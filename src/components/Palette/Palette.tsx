import { useSettings } from "../../hooks/useSettings";
import { onColorPick, onPatternPick } from "../../store/settings";
import type {
  OriginalPattern,
  Palette as PaletteKey,
} from "../../style/colors";
import { colors, patterns } from "../../style/colors";
import { PaletteBtn } from "./PaletteBtn";

export const Palette = () => {
  const { color, pattern } = useSettings();
  const allPatterns = ["solid", ...Object.keys(patterns)];

  return (
    <div className="sticky top-4 z-40 flex justify-center">
      <div className="bg-base-100/90 flex flex-col gap-2 rounded-md p-2 shadow-md md:flex-row md:gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-base-content text-xs font-medium">Colors</span>
          <div className="grid grid-flow-col grid-rows-2 gap-2">
            {Object.keys(colors)?.map((k) => {
              const isSelected = color === k;
              return (
                <PaletteBtn
                  key={k}
                  aria-label={`${k} color`}
                  backgroundColor={colors[k as PaletteKey]}
                  isSelected={isSelected}
                  onClick={() => {
                    onColorPick(k as PaletteKey);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="border-l border-neutral-400" />
        <div className="flex flex-col items-start gap-1">
          <span className="text-base-content text-xs font-medium">
            Patterns
          </span>
          <div className="grid grid-flow-col grid-rows-2 gap-2">
            {allPatterns.map((k) => {
              const isSelected = pattern === k;
              return (
                <PaletteBtn
                  key={k}
                  isSelected={isSelected}
                  aria-label={`${k} pattern`}
                  onClick={() => {
                    onPatternPick(k as OriginalPattern);
                  }}
                  backgroundColor={k === "solid" ? colors[color] : "none"}
                  backgroundImage={
                    k !== "solid"
                      ? patterns[k as OriginalPattern]
                          .replaceAll("currentColor", colors[color])
                          .replaceAll("currentOpacity", "1")
                      : "none"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
