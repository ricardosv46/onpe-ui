import { IconChrome } from "../../icons/Browsers/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari";
import { IconEdge } from "../../icons/Browsers/IconEdge";

export const BrowserRecommended = () => {
  return (
    <div className="oui:flex oui:flex-col oui:lg:flex-row oui:lg:py-2 oui:items-center oui:justify-center oui:gap-6 oui:py-3 oui:pb-6 oui:text-xs oui:text-center oui:text-onpe-blue oui:bg-onpe-skyblue-light/15">
      <p>Navegadores recomendados:</p>
      <ul className="oui:flex oui:gap-6 oui:lg:gap-8">
        <li className="oui:flex oui:items-center oui:gap-2">
          <IconChrome aria-hidden="true" />
          <span className="oui:sr-only">Google Chrome</span>
          <p className="oui:hidden oui:md:block oui:text-left" aria-hidden="true">
            Google Chrome
          </p>
        </li>
        <li className="oui:flex oui:items-center oui:gap-2">
          <IconSafari aria-hidden="true" />
          <span className="oui:sr-only">Safari</span>
          <p className="oui:hidden oui:md:block oui:text-left" aria-hidden="true">
            Safari
          </p>
        </li>
        <li className="oui:flex oui:items-center oui:gap-2">
          <IconEdge aria-hidden="true" />
          <span className="oui:sr-only">Microsoft Edge</span>
          <p className="oui:hidden oui:md:block oui:text-left" aria-hidden="true">
            Microsoft Edge
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BrowserRecommended;
