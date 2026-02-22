import { IconChrome } from "../../icons/Browsers/IconChrome";
import { IconSafari } from "../../icons/Browsers/IconSafari";
import { IconEdge } from "../../icons/Browsers/IconEdge";

export const BrowserRecommended = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:py-2 items-center justify-center gap-6 py-3 pb-6 text-xs text-center text-onpe-blue bg-onpe-skyblue-light/15">
      <p>Navegadores recomendados:</p>
      <ul className="flex gap-6 lg:gap-8">
        <li className="flex items-center gap-2">
          <IconChrome aria-hidden="true" />
          <span className="sr-only">Google Chrome</span>
          <p className="hidden md:block text-left" aria-hidden="true">
            Google Chrome
          </p>
        </li>
        <li className="flex items-center gap-2">
          <IconSafari aria-hidden="true" />
          <span className="sr-only">Safari</span>
          <p className="hidden md:block text-left" aria-hidden="true">
            Safari
          </p>
        </li>
        <li className="flex items-center gap-2">
          <IconEdge aria-hidden="true" />
          <span className="sr-only">Microsoft Edge</span>
          <p className="hidden md:block text-left" aria-hidden="true">
            Microsoft Edge
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BrowserRecommended;
