import { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";
import { IconAndroid } from "../../../icons/OperatingSystems/IconAndroid";
import { IconApple } from "../../../icons/OperatingSystems/IconApple";

export interface ModalNfcProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  iconNfc1: ReactNode;
  iconNfc2: ReactNode;
  zIndexLevel?: number;
}

export const ModalNfc = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  iconNfc1,
  iconNfc2,
  zIndexLevel = 100,
}: ModalNfcProps) => {
  const ANDROID_VIDEO_URL = "https://www.youtube.com/watch?v=qlVVC9JHSro";
  const IPHONE_VIDEO_URL = "https://www.youtube.com/watch?v=wjzh_FUVXRE";

  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`oui:bg-white oui:max-w-[600px]! oui:pt-[46px] oui:pb-[46px] oui:px-[30px] oui:md:px-[50px] oui:md:pt-[35px] oui:md:pb-[54px]  ${className}`}
      closeButton={true}
      aria-label="¿Cómo saber si tu dispositivo móvil tiene NFC?"
    >
      <h2
        className="oui:text-center oui:text-onpe-blue oui:font-bold oui:text-base"
        tabIndex={0}
      >
        ¿Cómo saber si tu dispositivo móvil tiene NFC?
      </h2>

      <section className="oui:flex oui:flex-col oui:gap-6 oui:items-center oui:mt-8 oui:text-sm oui:w-full">
        {/* Android section */}
        <div className="oui:w-full">
          <p className="oui:text-sm oui:text-justify oui:mb-3" tabIndex={0}>
            <span className="oui:mr-1">1.</span>
            Celular Android
          </p>
          <ul role="presentation" className="oui:list-disc oui:pl-[26px] oui:mt-2">
            <li
              role="presentation"
              className="oui:text-sm oui:text-left oui:mb-2 oui:tracking-[0.15px]"
            >
              Desde la barra de notificaciones, simplemente deslizando hacia
              abajo desde tu pantalla y buscando el ícono del NFC.
            </li>
            <li
              role="presentation"
              className="oui:text-sm oui:text-left oui:mb-2 oui:tracking-[0.15px]"
            >
              Otra forma es ir hacia Ajustes
              <span aria-hidden="true">{" > "}</span>Conexiones o Redes
              Inalámbricas<span aria-hidden="true">{" > "}</span>Buscar
              &quot;NFC&quot;.
            </li>
          </ul>
        </div>

        {iconNfc1}

        {/* iPhone section */}
        <div className="oui:w-full">
          <p className="oui:text-sm oui:text-justify oui:mb-3" tabIndex={0}>
            <span className="oui:mr-1">2.</span>
            Celular iPhone
          </p>
          <ul role="presentation" className="oui:list-disc oui:pl-[26px] oui:mt-2">
            <li
              role="presentation"
              className="oui:text-sm oui:text-left oui:mb-2 oui:tracking-[0.15px]"
            >
              Todos los modelos iPhone 7 en adelante ya cuentan con tecnología
              NFC activa.
            </li>
          </ul>
        </div>

        {iconNfc2}

        {/* How to use NFC */}
        <h2
          className="oui:text-center oui:text-onpe-blue oui:font-bold oui:my-5 oui:text-base"
          tabIndex={0}
        >
          ¿Cómo usar el NFC correctamente?
        </h2>

        <div className="oui:pl-3 oui:w-full">
          <ol
            role="presentation"
            className="oui:text-sm oui:text-justify oui:list-decimal oui:list-outside"
          >
            <li role="presentation" className="oui:mb-2">
              Activa el NFC en tu celular.
            </li>
            <li role="presentation" className="oui:mb-2">
              Busca en internet dónde está el lector NFC según tu modelo.
            </li>
            <li role="presentation" className="oui:mb-2">
              Coloca tu DNIe sobre esa zona hasta que recibas la confirmación
              del sistema.
            </li>
            <li role="presentation" className="oui:mb-2">
              Puedes consultar los videos &quot;Aprende cómo leer tu DNIe con
              NFC&quot;:
            </li>
          </ol>
        </div>

        {/* OS links */}
        <div className="oui:flex oui:flex-row oui:gap-5 oui:justify-center oui:items-center">
          <a
            className="oui:text-onpe-skyblue oui:flex oui:flex-row oui:gap-2.5 oui:justify-center oui:items-center oui:no-underline oui:cursor-pointer oui:rounded-lg oui:px-2.5 oui:py-1.5 oui:transition-colors oui:duration-120 oui:focus-visible:outline-2 oui:focus-visible:outline-onpe-blue oui:focus-visible:outline-offset-2"
            href={ANDROID_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver video para Android en YouTube"
          >
            <IconAndroid />
            Android
          </a>
          <a
            className="oui:text-onpe-skyblue oui:flex oui:flex-row oui:gap-2.5 oui:justify-center oui:items-center oui:no-underline oui:cursor-pointer oui:rounded-lg oui:px-2.5 oui:py-1.5 oui:transition-colors oui:duration-120 oui:focus-visible:outline-2 oui:focus-visible:outline-onpe-blue oui:focus-visible:outline-offset-2"
            href={IPHONE_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver video para iPhone en YouTube"
          >
            <IconApple />
            iPhone
          </a>
        </div>
      </section>
    </Modal>
  );
};

export default ModalNfc;
