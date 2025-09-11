import React from "react";
import { IconChrome } from "../../icons/Browsers/IconChrome/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari/IconSafari";
import { IconMozilla } from "../../icons/Browsers/IconMozilla/IconMozilla";
import { IconEdge } from "../../icons/Browsers/IconEdge/IconEdge";

export const BrowserRecommended = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-3 pb-6 text-xs text-center text-onpe-ui-blue bg-onpe-ui-skyblue-light/15 lg:flex-row md:py-2">
      <p>Navegadores recomendados:</p>
      <div className="flex gap-6 md:gap-8">
        <div className="flex items-center gap-2">
          <IconChrome />
          <p className="hidden text-left md:block">Google Chrome</p>
        </div>
        <div className="flex items-center gap-2">
          <IconSafari />
          <p className="hidden text-left md:block">Safari</p>
        </div>
        <div className="flex items-center gap-2">
          <IconMozilla />
          <p className="hidden text-left md:block">Mozilla Firefox</p>
        </div>
        <div className="flex items-center gap-2">
          <IconEdge />
          <p className="hidden text-left md:block">Microsoft Edge</p>
        </div>
      </div>
    </div>
  );
};

export default BrowserRecommended;
