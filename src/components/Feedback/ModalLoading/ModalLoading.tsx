import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconSpinnerDesktop } from "../../../icons/Actions/IconSpinnerDesktop/IconSpinnerDesktop";
import { IconSpinnerMobile } from "../../../icons/Actions/IconSpinnerMobile/IconSpinnerMobile";

export interface ModalLoadingProps {
  isOpen: boolean;
  onClose?: () => void;
  message?: string;
  className?: string;
}

export const ModalLoading = ({ isOpen = false, onClose = () => {}, message = "Cargando...", className = "" }: ModalLoadingProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className} whitoutBackground={true}>
      <IconSpinnerDesktop className="hidden text-white animate-spin md:block" />
      <IconSpinnerMobile className="block text-white animate-spin md:hidden" />
      <p className="text-white leading-normal text-2xl md:text-[64px] text-center mt-10 md:mt-20">{message}</p>
    </Modal>
  );
};

export default ModalLoading;
