import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconWindow } from "../../../icons/OperatingSystems/IconWindow/IconWindow";
import { IconAndroid } from "../../../icons/OperatingSystems/IconAndroid/IconAndroid";
import { IconApple } from "../../../icons/OperatingSystems/IconApple/IconApple";
import "./ModalSystemIncompatible.css";

export interface ModalSystemIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const ModalSystemIncompatible = ({ isOpen = false, onClose = () => {}, className = "" }: ModalSystemIncompatibleProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`onpe-modal-system-incompatible-container ${className}`} closeButton={true} closeDisabled>
      <div className="onpe-modal-system-incompatible-icon-container">
        <IconWarning className="onpe-modal-system-incompatible-icon" />
      </div>

      <p className="onpe-modal-system-incompatible-title">Sistema Operativo no recomendado</p>

      <p className="onpe-modal-system-incompatible-message">
        Para descargar e instalar el ONPEID utiliza un dispositivo con sistema operativo Windows, macOS, Android o iOS.
      </p>

      <div className="onpe-modal-system-incompatible-systems-container">
        <IconWindow className="onpe-modal-system-incompatible-system-icon" />
        <IconAndroid className="onpe-modal-system-incompatible-system-icon" />
        <IconApple className="onpe-modal-system-incompatible-system-icon" />
      </div>
    </Modal>
  );
};

export default ModalSystemIncompatible;
