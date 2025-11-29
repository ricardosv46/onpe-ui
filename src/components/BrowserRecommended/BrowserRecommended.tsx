import React from "react";
import { IconChrome } from "../../icons/Browsers/IconChrome/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari/IconSafari";
import { IconEdge } from "../../icons/Browsers/IconEdge/IconEdge";
import "./BrowserRecommended.css";

export const BrowserRecommended = () => {
  return (
    <div className="onpe-browser-recommended">
      <p>Navegadores recomendados:</p>
      <ul className="onpe-browser-list">
        <li className="onpe-browser-item" aria-label="Google Chrome">
          <IconChrome aria-hidden="true" />
          <p className="onpe-browser-name">Google Chrome</p>
        </li>
        <li className="onpe-browser-item" aria-label="Safari">
          <IconSafari aria-hidden="true" />
          <p className="onpe-browser-name">Safari</p>
        </li>
        <li className="onpe-browser-item" aria-label="Microsoft Edge">
          <IconEdge aria-hidden="true" />
          <p className="onpe-browser-name">Microsoft Edge</p>
        </li>
      </ul>
    </div>
  );
};

export default BrowserRecommended;
