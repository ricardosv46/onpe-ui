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
  color?: "blue" | "red";
  onConfirm?: () => void;
  onCancel?: () => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  twoButtons?: boolean;
  className?: string;
  zIndexLevel?: number;
}

export const ModalConfirm = ({
  isOpen = false,
  onClose = () => {},
  title,
  message,
  icon = "warning",
  color = "blue",
  onConfirm = () => {},
  onCancel = () => {},
  textButtonConfirm = "Confirmar",
  textButtonCancel = "Cancelar",
  twoButtons = true,
  className = "",
  zIndexLevel = 100,
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
      zIndexLevel={zIndexLevel}
    >
      <div className={`onpe-modal-confirm-icon-container onpe-modal-confirm-icon-${color}`}>
        {icon === "warning" && <IconWarning className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`} />}
        {icon === "success" && <IconCheck className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`} />}
      </div>

      <p className={`onpe-modal-confirm-title onpe-modal-confirm-title-${color}`}>{title}</p>

      <p className="onpe-modal-confirm-message">{message}</p>

      <div className="onpe-modal-confirm-buttons-container">
        {twoButtons && <Button className="onpe-modal-confirm-button" color="skyblue" title={textButtonCancel} onClick={handleCancel} />}
        <Button className="onpe-modal-confirm-button" color="red" title={textButtonConfirm} onClick={handleConfirm} />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
