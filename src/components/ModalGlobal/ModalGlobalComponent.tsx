"use client";

import type { ReactNode } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { IconWarningNotRecommended } from "../../icons/Actions/IconWarningNotRecommended";
import { IconCheck } from "../../icons/Actions/IconCheck";
import { IconInfo } from "../../icons/Actions/IconInfo";
import type { ModalPayload, ModalType } from "../../store/modalGlobal/useModalGlobalStore";

interface ModalGlobalComponentProps extends ModalPayload {
  isOpen: boolean;
  onConfirmAction: () => void;
  onCancelAction: () => void;
  onCloseAction: () => void;
  zIndexLevel?: number;
}

const iconColorMap: Record<ModalType, string> = {
  error: "text-onpe-red",
  warning: "text-onpe-yellow",
  success: "text-onpe-skyblue",
  question: "text-onpe-blue",
};

const titleColorMap: Record<ModalType, string> = {
  error: "text-onpe-red",
  warning: "text-onpe-yellow",
  success: "text-onpe-skyblue",
  question: "text-onpe-blue",
};

const confirmButtonColorMap: Record<ModalType, "red" | "skyblue"> = {
  error: "red",
  warning: "red",
  success: "skyblue",
  question: "red",
};

function renderIcon(type: ModalType, colorClass: string): ReactNode {
  if (type === "success") {
    return <IconCheck role="presentation" className={`w-16 h-16 ${colorClass}`} />;
  }
  if (type === "question") {
    return <IconInfo role="presentation" className={`w-16 h-16 ${colorClass}`} />;
  }
  return <IconWarningNotRecommended role="presentation" className={`w-16 h-16 ${colorClass}`} />;
}

export const ModalGlobalComponent = ({
  isOpen,
  type = "error",
  title,
  message,
  content,
  onConfirm,
  onCancel,
  buttonMode,
  textButtonConfirm = "Aceptar",
  textButtonCancel = "Cancelar",
  disabledConfirmButton = false,
  closeDisabled = false,
  onConfirmAction,
  onCancelAction,
  onCloseAction,
  zIndexLevel = 200,
}: ModalGlobalComponentProps) => {
  const titleId = "modal-global-title";
  const messageId = "modal-global-message";

  const iconColorClass = iconColorMap[type];
  const titleColorClass = titleColorMap[type];
  const confirmButtonColor = confirmButtonColorMap[type];

  const showTwoButtons = buttonMode === "double" || typeof onCancel === "function";

  const handleConfirm = async () => {
    try {
      if (onConfirm) await onConfirm();
    } finally {
      onConfirmAction();
    }
  };

  const handleCancel = async () => {
    try {
      if (onCancel) await onCancel();
    } finally {
      onCancelAction();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseAction}
      closeDisabled={closeDisabled}
      escapeToClose={!closeDisabled}
      zIndexLevel={zIndexLevel}
      className="!max-w-[719px] !pt-[30px] !pb-[30px] !px-[30px]"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={message || content ? messageId : undefined}
    >
      {/* Icon */}
      <div className="flex items-center justify-center">
        {renderIcon(type, iconColorClass)}
      </div>

      {/* Title */}
      {title && (
        <p
          id={titleId}
          className={[
            "mt-4 text-lg md:text-2xl font-semibold text-center",
            titleColorClass,
          ].join(" ")}
        >
          {title}
        </p>
      )}

      {/* Content or message */}
      <div
        id={messageId}
        className="mt-7 text-sm md:text-lg text-center max-w-full text-onpe-dark-gray"
      >
        {content ?? <span>{message}</span>}
      </div>

      {/* Mobile buttons: stacked */}
      <div className="flex flex-col items-center justify-center w-full gap-5 mt-11 md:hidden">
        <Button
          className="w-full max-w-[200px]"
          color={confirmButtonColor}
          title={textButtonConfirm}
          onClick={handleConfirm}
          disabled={disabledConfirmButton}
        />
        {showTwoButtons && (
          <Button
            className="w-full max-w-[200px]"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
      </div>

      {/* Desktop buttons: row */}
      <div className="hidden md:flex md:flex-row items-center justify-center w-full gap-5 mt-11">
        {showTwoButtons && (
          <Button
            className="w-[200px]"
            color="skyblue"
            title={textButtonCancel}
            onClick={handleCancel}
          />
        )}
        <Button
          className="w-[200px]"
          color={confirmButtonColor}
          title={textButtonConfirm}
          onClick={handleConfirm}
          disabled={disabledConfirmButton}
        />
      </div>
    </Modal>
  );
};

export default ModalGlobalComponent;
