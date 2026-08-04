import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Status/IconWarning";
import { IconWindow } from "../../../icons/OperatingSystems/IconWindow";
import { IconAndroid } from "../../../icons/OperatingSystems/IconAndroid";
import { IconApple } from "../../../icons/OperatingSystems/IconApple";

export interface ModalSystemIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  zIndexLevel?: number;
}

export const ModalSystemIncompatible = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  zIndexLevel = 1000,
}: ModalSystemIncompatibleProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`oui:bg-white oui:pt-[25px] oui:px-4 oui:pb-[50px] oui:md:pt-[35px] oui:md:px-8 oui:md:pb-[54px] oui:max-w-[680px]! ${className}`}
      closeButton={true}
      closeDisabled
    >
      <div className="oui:flex oui:items-center oui:justify-center">
        <IconWarning
          className="oui:w-16 oui:h-16 oui:sm:w-[84px] oui:sm:h-[84px] oui:text-onpe-skyblue"
          role="presentation"
        />
      </div>

      <p className="oui:mt-1 oui:text-base oui:sm:text-2xl oui:font-semibold oui:text-center oui:text-onpe-skyblue">
        Sistema Operativo no recomendado
      </p>

      <p className="oui:mt-6 oui:text-base oui:sm:text-lg oui:text-center oui:sm:px-2">
        Para descargar e instalar el ONPEID utiliza un dispositivo con sistema
        operativo Windows, macOS, Android o iOS.
      </p>

      <div className="oui:flex oui:items-center oui:justify-center oui:gap-8 oui:mt-[47px] oui:sm:gap-12">
        <IconWindow
          role="img"
          aria-label="Windows 10 o superior"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12 oui:text-onpe-skyblue"
        />
        <IconAndroid
          role="img"
          aria-label="Android 7.0 o superior"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12 oui:text-onpe-skyblue"
        />
        <IconApple
          role="img"
          aria-label="macOS 10.12 o superior / iOS 11.0 o superior"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12 oui:text-onpe-skyblue"
        />
      </div>
    </Modal>
  );
};

export default ModalSystemIncompatible;
