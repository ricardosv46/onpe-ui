import { HTMLAttributes, ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import { FaceBookIcon } from "../../icons/Redes/FaceBookIcon";
import { XIcon } from "../../icons/Redes/XIcon";
import { TikTokIcon } from "../../icons/Redes/TikTokIcon";
import { YoutubeIcon } from "../../icons/Redes/YoutubeIcon";
import { InstagramIcon } from "../../icons/Redes/InstagramIcon";

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
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
    <footer {...props} tabIndex={0} aria-label="">
      {showFooterContent && (
        <>
          {children && children}

          {showBrowserInfo && <BrowserRecommended />}
          {showContactInfo && (
            <div className="oui:relative oui:z-10 oui:flex oui:w-full oui:min-h-[100px] oui:bg-onpe-blue">
              <div className="oui:flex oui:justify-between oui:items-start oui:w-full oui:flex-col oui:gap-6 oui:mx-auto oui:py-14 oui:px-4 oui:max-w-[1460px] oui:md:py-5 oui:md:px-4 oui:lg:flex-row oui:lg:items-center">
                <div tabIndex={0}>
                  <p className="oui:font-semibold oui:text-onpe-yellow oui:mb-1">
                    <span className="oui:sr-only">Oficina central</span>
                    <span aria-hidden="true">Oficina central:</span>
                  </p>
                  <p className="oui:flex oui:text-sm oui:font-medium oui:text-white">
                    <span className="oui:sr-only" lang="es-PE">
                      Dirección: jiroon Washington 1894, Cercado de Lima
                    </span>
                    <span aria-hidden="true">
                      Jr. Washington 1894, Cercado de Lima
                    </span>
                  </p>
                  <p className="oui:flex oui:text-sm oui:font-medium oui:text-white">
                    <span className="oui:sr-only">
                      Horario de atención: Lunes a viernes de 8:30 a. m. a 5:00
                      p. m.
                    </span>
                    <span aria-hidden="true">
                      Lunes a viernes de 8:30 a. m. a 5:00 p. m.
                    </span>
                  </p>
                </div>
                <div tabIndex={0}>
                  <p className="oui:font-semibold oui:text-onpe-yellow oui:mb-1">
                    <span className="oui:sr-only">Contáctanos</span>
                    <span aria-hidden="true">Contáctanos:</span>
                  </p>
                  <p className="oui:flex oui:text-sm oui:font-medium oui:text-white">
                    <span className="oui:sr-only">
                      Correo electrónico, informes@onpe punto goob punto pe,
                    </span>
                    <span aria-hidden="true">informes@onpe.gob.pe</span>
                  </p>
                  <p className="oui:flex oui:text-sm oui:font-medium oui:text-white">
                    <span className="oui:sr-only">
                      Número telefónico, (01)4170630,
                    </span>
                    <span aria-hidden="true">(01)4170630</span>
                  </p>
                </div>
                <div tabIndex={0}>
                  <p className="oui:font-semibold oui:text-onpe-yellow oui:mb-1">
                    <span className="oui:sr-only">
                      Síguenos en nuestras redes sociales
                    </span>
                    <span aria-hidden="true">Síguenos:</span>
                  </p>
                  <p className="oui:flex oui:text-sm oui:font-medium oui:text-white oui:gap-4">
                    <a
                      href="https://www.facebook.com/ONPEoficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook de ONPE,"
                      className="oui:text-onpe-blue-dark"
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
                      className="oui:text-onpe-blue-dark"
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
                      className="oui:text-onpe-blue-dark"
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
                      className="oui:text-onpe-blue-dark"
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
                      className="oui:text-onpe-blue-dark"
                    >
                      <span aria-hidden="true">
                        <YoutubeIcon />
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isDevelopment && (
        <div className="oui:h-[93px] oui:w-full oui:text-center oui:flex oui:items-center oui:justify-center oui:bg-onpe-yellow-light/75 oui:fixed oui:z-10 oui:right-0 oui:bottom-0 oui:lg:h-[46px]">
          <p className="oui:py-2 oui:px-2 oui:text-2xl oui:text-onpe-blue oui:font-[Consolas,monospace] oui:font-black">
            Versión en Desarrollo - No Oficial
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
