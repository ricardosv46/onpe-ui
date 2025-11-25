import React, { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import "./Footer.css";
import { FaceBookIcon } from "../../icons/Redes/FaceBookIcon";
import { XIcon } from "../../icons/Redes/XIcon";
import { TikTokIcon } from "../../icons/Redes/TikTokIcon";
import { YoutubeIcon } from "../../icons/Redes/YoutubeIcon";
import { InstagramIcon } from "../../icons/Redes/InstagramIcon";
import { WhatsappIcon } from "../../icons/Redes/WhatsappIcon";

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
    <footer {...props} tabIndex={0} aria-label="Información para contactarnos">
      {showFooterContent && (
        <>
          {children && children}

          {showBrowserInfo && <BrowserRecommended />}
          {showContactInfo && (
            <div className="onpe-footer-contact">
              <ul className="onpe-footer-contact-list">
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p className="onpe-footer-contact-title">Oficina central</p>
                  <p className="onpe-footer-contact-text">
                    <span className="sr-only">Jiron</span>
                    <span aria-hidden="true">Jr.</span> Washington 1894 -
                    Cercado de Lima
                  </p>
                  <p className="onpe-footer-contact-text">
                    Lunes a viernes de 8:30 a.m. a 5:00 p. m.
                  </p>
                </li>
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p className="onpe-footer-contact-title">Contáctanos:</p>
                  <p
                    className="onpe-footer-contact-text"
                    aria-label="Correo electrónico, informes@onpe punto goob punto pe,"
                  >
                    informes@onpe.gob.pe
                  </p>
                  <p
                    className="onpe-footer-contact-text"
                    aria-label="Número de Teléfono, +51 (01)4170630,"
                  >
                    (01)4170630
                  </p>
                  <p className="onpe-footer-contact-text">
                    <a
                      href="https://wa.me/+51995404991"
                      className="flex"
                      target="_blank"
                      aria-hidden="true"
                    >
                      <WhatsappIcon aria-hidden="true" />
                      &nbsp; Whatsapp: 995 404 991
                    </a>
                  </p>
                </li>
                <li tabIndex={0} className="onpe-footer-contact-item">
                  <p
                    className="onpe-footer-contact-title"
                    aria-label="Síguenos en nuestra redes sociales"
                  >
                    Síguenos:
                  </p>
                  <p className="onpe-footer-contact-text flex gap-4">
                    <a
                      href="https://www.facebook.com/ONPEoficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook de ONPE,"
                      className="onpe-footer-contact-item-color"
                    >
                      <span aria-hidden="true">
                        <FaceBookIcon />
                      </span>
                    </a>
                    <a
                      href="https://x.com/ONPE_oficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X de ONPE (antes Twitter),"
                      className="onpe-footer-contact-item-color"
                    >
                      <span aria-hidden="true">
                        <XIcon />
                      </span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@onpe_oficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok de ONPE,"
                      className="onpe-footer-contact-item-color"
                    >
                      <span aria-hidden="true">
                        <TikTokIcon />
                      </span>
                    </a>
                    <a
                      href="https://www.instagram.com/ONPE_oficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram de ONPE,"
                      className="onpe-footer-contact-item-color"
                    >
                      <span aria-hidden="true">
                        <InstagramIcon />
                      </span>
                    </a>
                    <a
                      href="https://www.youtube.com/@onpeprensa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube de ONPE,"
                      className="onpe-footer-contact-item-color"
                    >
                      <span aria-hidden="true">
                        <YoutubeIcon />
                      </span>
                    </a>
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
            Versión en Desarrollo{" "}
            <br className="onpe-footer-development-break" /> - No Oficial
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
