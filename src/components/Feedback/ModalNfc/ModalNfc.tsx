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
      className={`max-w-[600px]! pt-[46px]! pb-[46px]! px-[30px]! md:px-[50px]! ${className}`}
      closeButton={true}
    >
      <h2 className="text-center text-onpe-blue font-bold text-base" tabIndex={0}>
        ¿Cómo saber si tu dispositivo móvil tiene NFC?
      </h2>

      <section className="flex flex-col gap-6 items-center mt-8 text-sm w-full">
        {/* Android section */}
        <div className="w-full">
          <p className="text-sm text-justify mb-3" tabIndex={0}>
            <span className="mr-1">1.</span>
            Celular Android
          </p>
          <ul role="presentation" className="list-disc pl-[26px] mt-2">
            <li role="presentation" className="text-sm text-left mb-2 tracking-[0.15px]">
              Desde la barra de notificaciones, simplemente deslizando hacia
              abajo desde tu pantalla y buscando el ícono del NFC.
            </li>
            <li role="presentation" className="text-sm text-left mb-2 tracking-[0.15px]">
              Otra forma es ir hacia Ajustes
              <span aria-hidden="true">{" > "}</span>Conexiones o Redes
              Inalámbricas<span aria-hidden="true">{" > "}</span>Buscar &quot;NFC&quot;.
            </li>
          </ul>
        </div>

        {iconNfc1}

        {/* iPhone section */}
        <div className="w-full">
          <p className="text-sm text-justify mb-3" tabIndex={0}>
            <span className="mr-1">2.</span>
            Celular iPhone
          </p>
          <ul role="presentation" className="list-disc pl-[26px] mt-2">
            <li role="presentation" className="text-sm text-left mb-2 tracking-[0.15px]">
              Todos los modelos iPhone 7 en adelante ya cuentan con tecnología
              NFC activa.
            </li>
          </ul>
        </div>

        {iconNfc2}

        {/* How to use NFC */}
        <h2 className="text-center text-onpe-blue font-bold my-5 text-base" tabIndex={0}>
          ¿Cómo usar el NFC correctamente?
        </h2>

        <div className="pl-3 w-full">
          <ol role="presentation" className="text-sm text-justify list-decimal list-outside">
            <li role="presentation" className="mb-2">Activa el NFC en tu celular.</li>
            <li role="presentation" className="mb-2">
              Busca en internet dónde está el lector NFC según tu modelo.
            </li>
            <li role="presentation" className="mb-2">
              Coloca tu DNIe sobre esa zona hasta que recibas la confirmación
              del sistema.
            </li>
            <li role="presentation" className="mb-2">
              Puedes consultar los videos &quot;Aprende como leer tu DNIe con NFC&quot;:
            </li>
          </ol>
        </div>

        {/* OS links */}
        <div className="flex flex-row gap-5 justify-center items-center">
          <a
            className="text-onpe-skyblue flex flex-row gap-2.5 justify-center items-center no-underline cursor-pointer rounded-lg px-2.5 py-1.5 transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-onpe-blue focus-visible:outline-offset-2"
            href={ANDROID_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver video para Android en YouTube"
          >
            <IconAndroid />
            Android
          </a>
          <a
            className="text-onpe-skyblue flex flex-row gap-2.5 justify-center items-center no-underline cursor-pointer rounded-lg px-2.5 py-1.5 transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-onpe-blue focus-visible:outline-offset-2"
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
