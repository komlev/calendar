import clsx from "clsx";
import type { FC } from "react";
import type { Tab } from "../../store/settings";
import { Tabs } from "../../store/settings";

type Props = {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
};

export const ViewsTabs: FC<Props> = ({ tab, onTabChange }) => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTabChange(event.target.value as Tab);
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-border hidden md:block">
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
      <div className="md:hidden">
        <select
          aria-label="View selector"
          value={tab}
          className="select select-ghost"
          onChange={onSelect}
        >
          <option disabled>Select a view</option>
          {Tabs.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
