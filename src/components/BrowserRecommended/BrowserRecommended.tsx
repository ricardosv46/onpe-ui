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
        <li className="onpe-browser-item">
          <IconChrome aria-hidden="true" />
          <span className="sr-only">Google Chrome</span>
          <p className="onpe-browser-name" aria-hidden="true">
            Google Chrome
          </p>
        </li>
        <li className="onpe-browser-item">
          <IconSafari aria-hidden="true" />
          <span className="sr-only">Safari</span>
          <p className="onpe-browser-name" aria-hidden="true">
            Safari
          </p>
        </li>
        <li className="onpe-browser-item">
          <IconEdge aria-hidden="true" />
          <span className="sr-only">Microsoft Edge</span>
          <p className="onpe-browser-name" aria-hidden="true">
            Microsoft Edge
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BrowserRecommended;
