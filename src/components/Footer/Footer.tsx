import React from "react";
import { IconInfo } from "../../icons/Actions/IconInfo/IconInfo";
import { useToggle } from "../../hooks/useToggle/useToggle";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";

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
  return (
    <footer {...props}>
      {showFooterContent && (
        <>
          {showVersionInfo ? showVersionInfo : <></>}

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
