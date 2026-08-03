import { classNames } from "../../utils/classNames";

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsUnderlineProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function TabsUnderline({ tabs, activeKey, onChange, className = "" }: TabsUnderlineProps) {
  return (
    <div
      role="tablist"
      className={classNames([
        "oui:flex oui:gap-4 oui:border-b oui:border-onpe-gray-light oui:justify-center",
        className,
      ])}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={classNames([
              "oui:px-4 oui:py-2 oui:cursor-pointer oui:transition-colors oui:duration-300 oui:ease-in-out",
              isActive
                ? "oui:border-b-2 oui:border-onpe-skyblue oui:text-onpe-skyblue oui:font-semibold"
                : "oui:text-onpe-dark-gray",
            ])}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabsUnderline;
