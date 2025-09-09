import React, { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import { IconInfo } from "../../icons/Actions/IconInfo/IconInfo";
import { useToggle } from "../../hooks/useToggle/useToggle";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  showBrowserInfo?: boolean;
  showContactInfo?: boolean;
  showVersionInfo?: ReactNode;
  isDevelopment?: boolean;
  showFooterContent?: boolean;
}

export const Footer = ({
  showBrowserInfo = true,
  showContactInfo = true,
  showVersionInfo = true,
  showFooterContent = true,
  isDevelopment = false,
  ...props
}: FooterProps) => {
  const [isOpen, openTooltip, closeTooltip] = useToggle();

  return (
    <footer {...props}>
      {showFooterContent && (
        <>
          {showVersionInfo ? (
            <div className="flex items-center justify-center gap-2 py-2 text-xs text-onpe-ui-blue bg-onpe-ui-skyblue/15">
              <p>Versión 1.0.0</p>
              <div className="relative">
                <button
                  onMouseEnter={openTooltip}
                  onMouseLeave={closeTooltip}
                  className="flex items-center justify-center w-4 h-4 transition-colors text-onpe-ui-blue hover:text-onpe-ui-blue-dark"
                >
                  <IconInfo className="w-3 h-3" />
                </button>
                {isOpen && (
                  <div className="absolute z-50 px-2 py-1 text-xs text-white transform -translate-x-1/2 rounded shadow-lg bottom-6 left-1/2 bg-onpe-ui-blue whitespace-nowrap">
                    Información de versión
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-onpe-ui-blue"></div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}

          {showBrowserInfo && <BrowserRecommended />}
          {showContactInfo && (
            <div className="relative z-10 flex w-full px-4 bg-onpe-ui-blue">
              <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 justify-center py-14 lg:pt-[15px] lg:pb-[18px] w-full max-w-[1400px] mx-auto">
                <li className="text-left lg:text-center">
                  <p className="pb-2 font-semibold text-onpe-ui-yellow">Oficina central</p>
                  <p className="text-sm font-medium text-white">Jr. Washington 1894 - Cercado de Lima</p>
                </li>
                <li className="text-left lg:text-center">
                  <p className="pb-2 font-semibold text-onpe-ui-yellow">Escríbenos</p>
                  <p className="text-sm font-medium text-white">informes@onpe.gob.pe</p>
                </li>
                <li className="text-left lg:text-center">
                  <p className="pb-2 font-semibold text-onpe-ui-yellow">Central telefónica</p>
                  <p className="text-sm font-medium text-white">(01) 4170630 | Lunes a viernes de 8:30 a. m. a 4:30 p. m.</p>
                </li>
              </ul>
            </div>
          )}
        </>
      )}

      {isDevelopment && (
        <div className="h-[93px] lg:h-[46px] w-full text-center flex items-center justify-center bg-onpe-ui-yellow-light/75 fixed z-10 right-0 bottom-0">
          <p className="px-2 py-1 text-2xl text-onpe-ui-blue font-consolas">
            Versión en Desarrollo <br className="lg:hidden" /> - No Oficial
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
