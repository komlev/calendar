import { useSettings } from "../../hooks/useSettings";
import { onTabChange } from "../../store/settings";
import { Logo } from "./Logo";
import { SettingsSelect } from "./SettingsSelect";
import { ViewsTabs } from "./ViewsTabs";
import { YearSelector } from "./YearSelector";

export const Header = () => {
  const { tab, year } = useSettings();

  return (
    <header className="bg-base-100 navbar z-50 shadow-sm print:shadow-none">
      <div className="hidden gap-2 print:flex">
        <Logo />
        <div>{year}</div>
        <div>{tab}</div>
      </div>
      <div className="flex-1 print:hidden">
        <div className="flex gap-2">
          <Logo />
          <ViewsTabs tab={tab} onTabChange={onTabChange} />
          <YearSelector />
        </div>
      </div>
      <div className="flex-none print:hidden">
        <SettingsSelect />
      </div>
    </header>
  );
};
