import { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { IconCheck } from "../../../icons/Actions/IconCheck";
import { IconWarningNotRecommended } from "../../../icons";

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
  withoutAutoClose?: boolean;
  disableFocus?: boolean;
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
  disableFocus = false,
}: ModalConfirmProps) => {
  const titleId = "modal-confirm-title";
  const messageId = "modal-confirm-message";

  const handleConfirm = async () => {
    try {
      onConfirm();
      if (!withoutAutoClose) onClose();
    } catch (error) {
      console.error("Error en handleConfirm:", error);
      if (!withoutAutoClose) onClose();
    }
  };

  const handleCancel = () => {
    onCancel();
    if (!withoutAutoClose) onClose();
  };

  const iconColorClass = color === "red" ? "text-onpe-red" : "text-onpe-skyblue";
  const titleColorClass = color === "red" ? "text-onpe-red" : "text-onpe-skyblue";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`!max-w-[719px] !pt-[30px] !pb-[30px] !px-[30px] ${className}`}
      closeButton={false}
      closeDisabled
      zIndexLevel={zIndexLevel}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      disableFocus={disableFocus}
    >
      <div className="flex items-center justify-center">
        {icon === "warning" && (
          <IconWarningNotRecommended
          
            role="presentation"
            className={`w-16 h-16 ${iconColorClass}`}
          />
        )}
        {icon === "success" && (
          <IconCheck
            role="presentation"
            className={`w-16 h-16 ${iconColorClass}`}
          />
        )}
      </div>

      <p
        id={titleId}
        className={[
          message ? "mt-0 md:mt-4" : "mt-0",
          "text-lg md:text-2xl font-semibold text-center",
          titleColorClass,
        ].join(" ")}
      >
        {title}
      </p>

      {message && (
        <div
          id={messageId}
          className="mt-7 text-sm md:text-lg text-center max-w-full text-onpe-dark-gray"
        >
          {message}
        </div>
      )}

      {/* Mobile: stacked (confirm first, cancel second) */}
      <div className="flex flex-col items-center justify-center w-full gap-5 mt-11 md:hidden">
        <Button
          className="w-full max-w-[200px]"
          color="red"
          title={textButtonConfirm}
          onClick={handleConfirm}
        />
        {twoButtons && (
          <Button
            className="w-full max-w-[200px]"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
      </div>

      {/* Desktop: row (cancel first, confirm second) */}
      <div className="hidden md:flex md:flex-row items-center justify-center w-full gap-5 mt-11">
        {twoButtons && (
          <Button
            className="w-[200px]"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
        <Button
          className="w-[200px]"
          color="red"
          title={textButtonConfirm}
          onClick={handleConfirm}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
