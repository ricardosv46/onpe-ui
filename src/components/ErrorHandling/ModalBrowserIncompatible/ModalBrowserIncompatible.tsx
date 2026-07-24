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
      className={`oui:bg-white oui:pt-[25px] oui:px-4 oui:pb-[50px] oui:md:pt-[35px] oui:md:px-8 oui:md:pb-[54px] oui:max-w-[680px]! ${className}`}
      closeButton={true}
    >
      <div className="oui:flex oui:items-center oui:justify-center">
        <IconWarning
          className="oui:w-16 oui:h-16 oui:sm:w-[84px] oui:sm:h-[84px] oui:text-onpe-skyblue"
          role="presentation"
        />
      </div>

      <p className="oui:mt-1 oui:text-base oui:sm:text-2xl oui:font-semibold oui:text-center oui:text-onpe-skyblue">
        Estás usando un navegador no recomendado
      </p>

      <p className="oui:mt-6 oui:text-base oui:sm:text-lg oui:text-center oui:sm:px-2">
        Para una mejor experiencia y mayor seguridad, debes ingresar con los
        siguientes navegadores:
      </p>

      <div className="oui:flex oui:items-center oui:justify-center oui:gap-8 oui:mt-[47px] oui:sm:gap-12">
        <IconChromeColor
          role="img"
          aria-label="Google Chrome"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12"
        />
        <IconSafariColor
          role="img"
          aria-label="Safari"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12"
        />
        <IconEdgeColor
          role="img"
          aria-label="Microsoft Edge"
          className="oui:w-7 oui:h-7 oui:sm:w-12 oui:sm:h-12"
        />
      </div>
    </Modal>
  );
};

export default ModalBrowserIncompatible;
