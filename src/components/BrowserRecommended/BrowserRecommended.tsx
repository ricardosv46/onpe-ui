import React from "react";
import { IconChrome } from "../../icons/Browsers/IconChrome/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari/IconSafari";
import { IconMozilla } from "../../icons/Browsers/IconMozilla/IconMozilla";
import { IconEdge } from "../../icons/Browsers/IconEdge/IconEdge";

export interface BrowserRecommendedProps {
  className?: string;
  showLabels?: boolean;
  title?: string;
}

export const BrowserRecommended = ({ className = "", showLabels = true, title = "Navegadores recomendados:" }: BrowserRecommendedProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 pt-3 pb-6 text-xs text-center text-onpe-ui-blue bg-onpe-ui-skyblue/15 lg:flex-row md:py-2 ${className}`}
    >
      <p>{title}</p>
      <div className="flex gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <IconChrome className="w-4 h-4" />
          {showLabels && <p className="hidden text-left lg:block">Google Chrome</p>}
        </div>
        <div className="flex items-center gap-2">
          <IconSafari className="w-4 h-4" />
          {showLabels && <p className="hidden text-left lg:block">Safari</p>}
        </div>
        <div className="flex items-center gap-2">
          <IconMozilla className="w-4 h-4" />
          {showLabels && <p className="hidden text-left lg:block">Mozilla Firefox</p>}
        </div>
        <div className="flex items-center gap-2">
          <IconEdge className="w-4 h-4" />
          {showLabels && <p className="hidden text-left lg:block">Microsoft Edge</p>}
        </div>
      </div>
    </div>
  );
};

export default BrowserRecommended;
