import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconCheck } from "../../../icons/Actions/IconCheck/IconCheck";
import { ReactNode } from "react";
import "./ModalConfirm.css";

export interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: ReactNode;
  icon?: "warning" | "success";
  color?: "blue" | "red";
  onConfirm?: () => void;
  onCancel?: () => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  twoButtons?: boolean;
  className?: string;
  zIndexLevel?: number;
  withoutAutoClose?: boolean; // Nueva prop para auto cerrar el modal tras confirmar
}

export const ModalConfirm = ({
  isOpen = false,
  onClose = () => {},
  withoutAutoClose = false,
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
  // Generar IDs únicos para accesibilidad
  const titleId = 'modal-confirm-title';
  const messageId = 'modal-confirm-message';
  const ariaLabel = 'modal-confirm-aria-label';

  const handleConfirm = async () => {
    try {
      onConfirm();
      if (!withoutAutoClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error en handleConfirm:', error);
      if (!withoutAutoClose) {
        onClose();
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    if (!withoutAutoClose) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`onpe-modal-confirm-container ${className}`}
      closeButton={false}
      closeDisabled
      zIndexLevel={zIndexLevel}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      aria-label={ariaLabel}
    >
      <div
        className={`onpe-modal-confirm-icon-container onpe-modal-confirm-icon-${color}`}
      >
        {icon === 'warning' && (
          <IconWarning
            role='presentation'
            className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`}
          />
        )}
        {icon === 'success' && (
          <IconCheck
            role='presentation'
            className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`}
          />
        )}
      </div>

      <p
        className={`onpe-modal-confirm-title onpe-modal-confirm-title-${color}`}
      >
        {title}
      </p>

      <div className='onpe-modal-confirm-message'>{message}</div>
      <div className='onpe-modal-confirm-buttons-container'>
        {twoButtons && (
          <Button
            className='onpe-modal-confirm-button'
            color='skyblue'
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
        <Button
          className='onpe-modal-confirm-button'
          color='red'
          title={textButtonConfirm}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
