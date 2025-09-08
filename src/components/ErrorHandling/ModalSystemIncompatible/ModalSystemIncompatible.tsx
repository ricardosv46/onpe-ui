import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconWindow } from "../../../icons/OperatingSystems/IconWindow/IconWindow";
import { IconAndroid } from "../../../icons/OperatingSystems/IconAndroid/IconAndroid";
import { IconApple } from "../../../icons/OperatingSystems/IconApple/IconApple";

export interface ModalSystemIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const ModalSystemIncompatible = ({ isOpen = false, onClose = () => {}, className = "" }: ModalSystemIncompatibleProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`max-w-[680px] pt-10 pb-24.5 ${className}`} closeButton={true} closeDisabled>
      <div className="flex justify-center items-center">
        <IconWarning className="w-22 h-22 text-onpe-ui-skyblue" />
      </div>

      <p className="text-sm md:text-2xl text-center mt-6 text-onpe-ui-skyblue font-medium">Sistema Operativo no recomendado</p>

      <p className="text-sm md:text-lg mt-10 text-center xl:px-12">
        Para descargar e instalar el ONPEID utiliza un dispositivo con sistema operativo Windows, macOS, Android o iOS.
      </p>

      <div className="flex justify-center items-center gap-8 md:gap-12 mt-5 text-onpe-ui-skyblue">
        <IconWindow className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
        <IconAndroid className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
        <IconApple className="md:w-[48px] md:h-[48px] w-[32px] h-[32px]" />
      </div>
    </Modal>
  );
};

export default ModalSystemIncompatible;
