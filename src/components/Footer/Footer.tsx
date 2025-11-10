import React, { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import "./Footer.css";
import FaceBookIcon from "../../icons/Redes/FaceBookIcon";
import XIcon from "../../icons/Redes/XIcon";
import TikTokIcon from "../../icons/Redes/TikTokIcon";
import YoutubeIcon from "../../icons/Redes/YoutubeIcon";
import InstagramIcon from "../../icons/Redes/InstagramIcon";
import WhatsappIcon from "../../icons/Redes/WhatsappIcon";

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
            <div tabIndex={0} role="contentinfo" className="onpe-footer-contact">
              <ul className="onpe-footer-contact-list">
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p className="onpe-footer-contact-title">Oficina central</p>
                  <p className="onpe-footer-contact-text">Jr. Washington 1894 - Cercado de Lima</p>
                  <p className="onpe-footer-contact-text">Lunes a viernes de 8:30 a.m. a 5:00 p. m.</p>
                </li>
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p className="onpe-footer-contact-title">Contáctanos:</p>
                  <p className="onpe-footer-contact-text">informes@onpe.gob.pe</p>
                  <p className="onpe-footer-contact-text">+51 (01)4170630</p>
                  <p className="onpe-footer-contact-text flex">
                    <WhatsappIcon /> Whatsapp: 995 404 991</p>
                </li>
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p className="onpe-footer-contact-title">Síguenos:</p>
                  <p className="onpe-footer-contact-text flex">
                    <FaceBookIcon />
                    <XIcon />
                    <TikTokIcon />
                    <InstagramIcon />
                    <YoutubeIcon />
                  </p>
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
  );
};

export default Footer;
