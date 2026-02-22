import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning";
import { IconChromeColor } from "../../../icons/Browsers/IconChromeColor";
import { IconSafariColor } from "../../../icons/Browsers/IconSafariColor";
import { IconEdgeColor } from "../../../icons/Browsers/IconEdgeColor";

export interface ModalBrowserIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  zIndexLevel?: number;
}

export const ModalBrowserIncompatible = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  zIndexLevel = 100,
}: ModalBrowserIncompatibleProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`!max-w-[680px] ${className}`}
      closeButton={true}
    >
      <div className="flex items-center justify-center">
        <IconWarning
          className="w-16 h-16 sm:w-[84px] sm:h-[84px] text-onpe-skyblue"
          role="presentation"
        />
      </div>

      <p className="mt-1 text-base sm:text-2xl font-semibold text-center text-onpe-skyblue">
        Estás usando un navegador no recomendado
      </p>

      <p className="mt-6 text-base sm:text-lg text-center sm:px-2">
        Para una mejor experiencia y mayor seguridad, debes ingresar con los
        siguientes navegadores:
      </p>

      <div className="flex items-center justify-center gap-8 mt-[47px] sm:gap-12">
        <IconChromeColor
          role="img"
          aria-label="Google Chrome"
          className="w-7 h-7 sm:w-12 sm:h-12"
        />
        <IconSafariColor
          role="img"
          aria-label="Safari"
          className="w-7 h-7 sm:w-12 sm:h-12"
        />
        <IconEdgeColor
          role="img"
          aria-label="Microsoft Edge"
          className="w-7 h-7 sm:w-12 sm:h-12"
        />
      </div>
    </Modal>
  );
};

export default ModalBrowserIncompatible;
