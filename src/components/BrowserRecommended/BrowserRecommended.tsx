import React from "react";
import { IconChrome } from "../../icons/Browsers/IconChrome/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari/IconSafari";
import { IconMozilla } from "../../icons/Browsers/IconMozilla/IconMozilla";
import { IconEdge } from "../../icons/Browsers/IconEdge/IconEdge";
import "./BrowserRecommended.css";

export const BrowserRecommended = () => {
  return (
    <div className="onpe-ui-container">
      <div className="onpe-browser-recommended">
        <p>Navegadores recomendados:</p>
        <div className="onpe-browser-list">
          <div className="onpe-browser-item">
            <IconChrome />
            <p className="onpe-browser-name">Google Chrome</p>
          </div>
          <div className="onpe-browser-item">
            <IconSafari />
            <p className="onpe-browser-name">Safari</p>
          </div>
          {/* <div className="onpe-browser-item">
            <IconMozilla />
            <p className="onpe-browser-name">Mozilla Firefox</p>
          </div> */}
          <div className="onpe-browser-item">
            <IconEdge />
            <p className="onpe-browser-name">Microsoft Edge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserRecommended;
