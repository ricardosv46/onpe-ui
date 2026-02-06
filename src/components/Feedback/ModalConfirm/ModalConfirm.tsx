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
  const titleId = "modal-confirm-title";
  const messageId = "modal-confirm-message";

  const handleConfirm = async () => {
    try {
      onConfirm();
      if (!withoutAutoClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error en handleConfirm:", error);
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
    >
      <div
        className={`onpe-modal-confirm-icon-container onpe-modal-confirm-icon-${color}`}
      >
        {icon === "warning" && (
          <IconWarning
            role="presentation"
            className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`}
          />
        )}
        {icon === "success" && (
          <IconCheck
            role="presentation"
            className={`onpe-modal-confirm-icon onpe-modal-confirm-icon-${color}`}
          />
        )}
      </div>
      {!message && <div className="onpe-modal-confirm-message"></div>}

      <p
        className={` ${
          message
            ? "onpe-modal-confirm-title"
            : "onpe-modal-confirm-title-short"
        }    onpe-modal-confirm-title-${color}`}
      >
        {title}
      </p>

      {message && <div className="onpe-modal-confirm-message">{message}</div>}

      {/*
        En mobile el layout apila los botones. Para que Narrador lea en el mismo orden
        visual (arriba -> abajo), renderizamos un orden DOM distinto por breakpoint.
        Desktop se mantiene como estaba (Cancelar -> Confirmar).
      */}
      <div className="onpe-modal-confirm-buttons-container onpe-modal-confirm-buttons-mobile">
        <Button
          className="onpe-modal-confirm-button"
          color="red"
          title={textButtonConfirm}
          onClick={handleConfirm}
        />
        {twoButtons && (
          <Button
            className="onpe-modal-confirm-button"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
      </div>

      <div className="onpe-modal-confirm-buttons-container onpe-modal-confirm-buttons-desktop">
        {twoButtons && (
          <Button
            className="onpe-modal-confirm-button"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
        <Button
          className="onpe-modal-confirm-button"
          color="red"
          title={textButtonConfirm}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
