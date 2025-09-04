import { useSettings } from "../../hooks/useSettings";
import { onTabChange } from "../../store/settings";
import { SettingsSelect } from "./SettingsSelect";
import { ViewsTabs } from "./ViewsTabs";
import { YearSelector } from "./YearSelector";

export const Header = () => {
  const { tab } = useSettings();

  return (
    <header className="bg-base-100 navbar z-50 shadow-sm">
      <div className="flex-1">
        <div className="flex gap-2">
          <div className="focusable-neutral flex w-fit items-center gap-1 rounded-sm text-2xl font-black">
            <span className="flex items-center text-purple-600">
              <span className="hidden text-amber-500 md:inline-block">
                Year
              </span>
              <img src="/icon.svg" alt="YearPlanner Logo" className="h-5 w-5" />
              <span className="hidden md:inline-block">Planner</span>
            </span>
          </div>
          <ViewsTabs tab={tab} onTabChange={onTabChange} />
          <YearSelector />
        </div>
      </div>
      <div className="flex-none">
        <SettingsSelect />
      </div>
    </header>
  );
};
