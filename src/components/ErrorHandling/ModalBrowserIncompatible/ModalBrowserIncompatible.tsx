import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconChromeColor } from "../../../icons/Browsers/IconChromeColor/IconChromeColor";
import { IconSafariColor } from "../../../icons/Browsers/IconSafariColor/IconSafariColor";
import { IconMozillaColor } from "../../../icons/Browsers/IconMozillaColor/IconMozillaColor";
import { IconEdgeColor } from "../../../icons/Browsers/IconEdgeColor/IconEdgeColor";

export interface ModalBrowserIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const ModalBrowserIncompatible = ({ isOpen = false, onClose = () => {}, className = "" }: ModalBrowserIncompatibleProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`max-w-[680px] pt-5 pb-8 ${className}`} closeButton={true} closeDisabled>
      <div className="flex justify-center items-center">
        <IconWarning className="w-22 h-22 text-onpe-ui-skyblue" />
      </div>

      <p className="text-sm md:text-2xl text-center mt-6 text-onpe-ui-skyblue font-medium">Navegador no recomendado</p>

      <p className="text-sm md:text-lg text-center mt-6">
        Para una mejor experiencia y mayor seguridad, debes ingresar con los siguientes navegadores:
      </p>

      <div className="flex justify-center items-center gap-8 md:gap-12 mt-5">
        <IconChromeColor className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
        <IconSafariColor className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
        <IconMozillaColor className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
        <IconEdgeColor className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
      </div>
    </Modal>
  );
};

export default ModalBrowserIncompatible;
