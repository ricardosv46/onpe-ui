import React from "react";
import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconCheck } from "../../../icons/Actions/IconCheck/IconCheck";
import "./ModalConfirm.css";

export interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: "warning" | "success";
  onConfirm?: () => void;
  onCancel?: () => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  twoButtons?: boolean;
  className?: string;
}

export const ModalConfirm = ({
  isOpen = false,
  onClose = () => {},
  title,
  message,
  icon = "warning",
  onConfirm = () => {},
  onCancel = () => {},
  textButtonConfirm = "Confirmar",
  textButtonCancel = "Cancelar",
  twoButtons = true,
  className = "",
}: ModalConfirmProps) => {
  const handleConfirm = async () => {
    try {
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Error en handleConfirm:", error);
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`onpe-modal-confirm-container ${className}`}
      closeButton={true}
      closeDisabled
      topAbsolute={true}
    >
      <div className="onpe-modal-confirm-icon-container">
        {icon === "warning" && <IconWarning className="onpe-modal-confirm-icon" />}
        {icon === "success" && <IconCheck className="onpe-modal-confirm-icon" />}
      </div>

      <p className="onpe-modal-confirm-title">{title}</p>

      <p className="onpe-modal-confirm-message">{message}</p>

      <div className="onpe-modal-confirm-buttons-container">
        {twoButtons && <Button className="onpe-modal-confirm-button" color="blue" title={textButtonCancel} onClick={handleCancel} />}
        <Button className="onpe-modal-confirm-button" color="red" title={textButtonConfirm} onClick={handleConfirm} />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
