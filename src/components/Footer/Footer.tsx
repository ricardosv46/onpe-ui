import React, { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  showBrowserInfo?: boolean;
  showContactInfo?: boolean;
  children?: ReactNode;
  isDevelopment?: boolean;
  showFooterContent?: boolean;
}

export const Footer = ({
  showBrowserInfo = true,
  showContactInfo = true,
  children,
  showFooterContent = true,
  isDevelopment = true,
  ...props
}: FooterProps) => {
  return (
    <footer {...props}>
      {showFooterContent && (
        <>
          {children && children}

          {showBrowserInfo && <BrowserRecommended />}
          {showContactInfo && (
            <div className="relative z-10 flex w-full min-h-[100px] bg-onpe-ui-blue ">
              <ul className="flex justify-between items-start lg:items-center w-full flex-col gap-6 mx-auto lg:flex-row py-14 px-4 max-w-[1456px] md:py-7">
                <li>
                  <p className="font-semibold pb text-onpe-ui-yellow">Oficina central</p>
                  <p className="text-sm font-medium text-white">Jr. Washington 1894 - Cercado de Lima</p>
                </li>
                <li>
                  <p className="font-semibold text-onpe-ui-yellow">Escríbenos</p>
                  <p className="text-sm font-medium text-white">informes@onpe.gob.pe</p>
                </li>
                <li>
                  <p className="font-semibold text-onpe-ui-yellow">Central telefónica</p>
                  <p className="text-sm font-medium text-white">(01) 4170630 | Lunes a viernes de 8:30 a.m. a 4:30 p.m.</p>
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
