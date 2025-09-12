import React, { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import "./Footer.css";

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
    <div className="onpe-ui-container">
      <footer {...props}>
        {showFooterContent && (
          <>
            {children && children}

            {showBrowserInfo && <BrowserRecommended />}
            {showContactInfo && (
              <div className="onpe-footer-contact">
                <ul className="onpe-footer-contact-list">
                  <li className="onpe-footer-contact-item">
                    <p className="onpe-footer-contact-title">Oficina central</p>
                    <p className="onpe-footer-contact-text">Jr. Washington 1894 - Cercado de Lima</p>
                  </li>
                  <li className="onpe-footer-contact-item">
                    <p className="onpe-footer-contact-title">Escríbenos</p>
                    <p className="onpe-footer-contact-text">informes@onpe.gob.pe</p>
                  </li>
                  <li className="onpe-footer-contact-item">
                    <p className="onpe-footer-contact-title">Central telefónica</p>
                    <p className="onpe-footer-contact-text">(01) 4170630 | Lunes a viernes de 8:30 a.m. a 4:30 p.m.</p>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        {isDevelopment && (
          <div className="onpe-footer-development">
            <p className="onpe-footer-development-text">
              Versión en Desarrollo <br className="onpe-footer-development-break" /> - No Oficial
            </p>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Footer;
