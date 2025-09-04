import clsx from "clsx";
import { useSettings } from "../../hooks/useSettings";
import { onTabChange, Tabs } from "../../store/settings";
import { SettingsSelect } from "./SettingsSelect";
import { YearSelector } from "./YearSelector";

export const Header = () => {
  const { tab } = useSettings();

  return (
    <header className="bg-base-100 navbar z-50 shadow-sm">
      <div className="flex-1">
        <div className="flex gap-2">
          <div className="focusable-neutral flex w-fit items-center gap-1 rounded-sm text-2xl font-black">
            <span className="hidden text-purple-600 text-shadow-xs md:block">
              <span className="text-amber-500">Year</span>Planner
            </span>
          </div>
          <div role="tablist" className="tabs tabs-border">
            {Tabs.map((t, index) => (
              <button
                key={index}
                role="tab"
                className={clsx("tab", tab === t && "tab-active")}
                onClick={() => {
                  onTabChange(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <YearSelector />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <SettingsSelect />
          </li>
        </ul>
      </div>
    </header>
  );
};
