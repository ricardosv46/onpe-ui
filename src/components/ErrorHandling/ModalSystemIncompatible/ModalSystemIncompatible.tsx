import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning";
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
      className={`bg-white pt-[25px] px-4 pb-[50px] md:pt-[35px] md:px-8 md:pb-[54px] max-w-[680px]! ${className}`}
      closeButton={true}
      closeDisabled
    >
      <div className="flex items-center justify-center">
        <IconWarning
          className="w-16 h-16 sm:w-[84px] sm:h-[84px] text-onpe-skyblue"
          role="presentation"
        />
      </div>

      <p className="mt-1 text-base sm:text-2xl font-semibold text-center text-onpe-skyblue">
        Sistema Operativo no recomendado
      </p>

      <p className="mt-6 text-base sm:text-lg text-center sm:px-2">
        Para descargar e instalar el ONPEID utiliza un dispositivo con sistema
        operativo Windows, macOS, Android o iOS.
      </p>

      <div className="flex items-center justify-center gap-8 mt-[47px] sm:gap-12">
        <IconWindow
          role="img"
          aria-label="Windows 10 o superior"
          className="w-7 h-7 sm:w-12 sm:h-12 text-onpe-skyblue"
        />
        <IconAndroid
          role="img"
          aria-label="Android 7.0 o superior"
          className="w-7 h-7 sm:w-12 sm:h-12 text-onpe-skyblue"
        />
        <IconApple
          role="img"
          aria-label="macOS 10.12 o superior / iOS 11.0 o superior"
          className="w-7 h-7 sm:w-12 sm:h-12 text-onpe-skyblue"
        />
      </div>
    </Modal>
  );
};

export default ModalSystemIncompatible;
