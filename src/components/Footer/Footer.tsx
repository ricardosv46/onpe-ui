import { ReactNode } from "react";
import { BrowserRecommended } from "../BrowserRecommended/BrowserRecommended";
import { FaceBookIcon } from "../../icons/Redes/FaceBookIcon";
import { XIcon } from "../../icons/Redes/XIcon";
import { TikTokIcon } from "../../icons/Redes/TikTokIcon";
import { YoutubeIcon } from "../../icons/Redes/YoutubeIcon";
import { InstagramIcon } from "../../icons/Redes/InstagramIcon";

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
    <footer {...props} tabIndex={0} aria-label="">
      {showFooterContent && (
        <>
          {children && children}

          {showBrowserInfo && <BrowserRecommended />}
          {showContactInfo && (
            <div className="relative z-10 flex w-full min-h-[100px] bg-onpe-blue">
              <div className="flex justify-between items-start w-full flex-col gap-6 mx-auto py-14 px-4 max-w-[1460px] md:py-5 md:px-4 lg:flex-row lg:items-center">
                <div tabIndex={0}>
                  <p className="font-semibold text-onpe-yellow mb-1">
                    <span className="sr-only">Oficina central</span>
                    <span aria-hidden="true">Oficina central:</span>
                  </p>
                  <p className="flex text-sm font-medium text-white">
                    <span className="sr-only" lang="es-PE">
                      Dirección: jiroon Washington 1894, Cercado de Lima
                    </span>
                    <span aria-hidden="true">
                      Jr. Washington 1894, Cercado de Lima
                    </span>
                  </p>
                  <p className="flex text-sm font-medium text-white">
                    <span className="sr-only">
                      Horario de atención: Lunes a viernes de 8:30 a. m. a 5:00
                      p. m.
                    </span>
                    <span aria-hidden="true">
                      Lunes a viernes de 8:30 a. m. a 5:00 p. m.
                    </span>
                  </p>
                </div>
                <div tabIndex={0}>
                  <p className="font-semibold text-onpe-yellow mb-1">
                    <span className="sr-only">Contáctanos</span>
                    <span aria-hidden="true">Contáctanos:</span>
                  </p>
                  <p className="flex text-sm font-medium text-white">
                    <span className="sr-only">
                      Correo electrónico, informes@onpe punto goob punto pe,
                    </span>
                    <span aria-hidden="true">informes@onpe.gob.pe</span>
                  </p>
                  <p className="flex text-sm font-medium text-white">
                    <span className="sr-only">
                      Número telefónico, (01)4170630,
                    </span>
                    <span aria-hidden="true">(01)4170630</span>
                  </p>
                </div>
                <div tabIndex={0}>
                  <p className="font-semibold text-onpe-yellow mb-1">
                    <span className="sr-only">
                      Síguenos en nuestras redes sociales
                    </span>
                    <span aria-hidden="true">Síguenos:</span>
                  </p>
                  <p className="flex text-sm font-medium text-white gap-4">
                    <a
                      href="https://www.facebook.com/ONPEoficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook de ONPE,"
                      className="text-onpe-blue-dark"
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
                      className="text-onpe-blue-dark"
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
                      className="text-onpe-blue-dark"
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
                      className="text-onpe-blue-dark"
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
                      className="text-onpe-blue-dark"
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
        <div className="h-[93px] w-full text-center flex items-center justify-center bg-onpe-yellow-light/75 fixed z-10 right-0 bottom-0 lg:h-[46px]">
          <p className="py-2 px-2 text-2xl text-onpe-blue font-[Consolas,monospace] font-black">
            Versión en Desarrollo - No Oficial
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
