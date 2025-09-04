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
    <div className="flex justify-center sticky top-4 z-40">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 bg-base-100/90 shadow-md p-2 rounded-md">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs font-medium text-base-content">Colors</span>
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
          <span className="text-xs font-medium text-base-content">
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
