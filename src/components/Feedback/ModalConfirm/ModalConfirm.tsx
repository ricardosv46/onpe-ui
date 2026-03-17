import { type ReactNode } from "react";
import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { IconCheck } from "../../../icons/Actions/IconCheck";
import { IconWarningNotRecommended } from "../../../icons";
import { IconQuestion } from "../../../icons/Actions/IconQuestion";
import { IconInfo } from "../../../icons/Actions/IconInfo";

export type ModalType = "warning" | "success" | "question" | "info" | "none";

/** Mapa de override de color a clase CSS (icono + título) */
const colorOverrideMap: Record<string, string> = {
  red: "text-onpe-red",
  blue: "text-onpe-blue",
  skyblue: "text-onpe-skyblue",
  yellow: "text-onpe-yellow",
};

function renderIcon(type: ModalType, colorClass: string): ReactNode {
  if (type === "none") return null;
  if (type === "success") {
    return <IconCheck role="presentation" className={`w-16 h-16 ${colorClass}`} />;
  }
  if (type === "question") {
    return <IconQuestion role="presentation" className={`w-16 h-16 ${colorClass}`} />;
  }
  if (type === "info") {
    return <IconInfo role="presentation" className={`w-16 h-16 ${colorClass}`} />;
  }
  // error | warning
  return <IconWarningNotRecommended role="presentation" className={`w-16 h-16 ${colorClass}`} />;
}

export interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Contenido del modal (string o JSX) */
  message?: ReactNode;
  /** Alias de message */
  content?: ReactNode;
  /** Tipo semántico: determina icono, color de título y color de botón confirmar */
  type?: ModalType;
  /** "double" muestra el botón cancelar */
  buttonMode?: "single" | "double";
  /** Deshabilita el botón confirmar */
  disabledConfirmButton?: boolean;
  /** Deshabilita el cierre del modal */
  closeDisabled?: boolean;
  /**
   * Override del color del icono y título.
   * Si no se provee, se deriva automáticamente del `type`.
   */
  color?: "red" | "blue" | "skyblue" | "yellow";
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  textButtonConfirm?: string;
  textButtonCancel?: string;
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
  content,
  type = "warning",
  buttonMode,
  disabledConfirmButton = false,
  closeDisabled = false,
  color,
  onConfirm = () => {},
  onCancel = () => {},
  textButtonConfirm = "Confirmar",
  textButtonCancel = "Cancelar",
  className = "",
  zIndexLevel = 100,
  disableFocus = false,
}: ModalConfirmProps) => {
  const titleId = "modal-confirm-title";
  const messageId = "modal-confirm-message";

  const effectiveMessage = message ?? content;
  // Título e ícono siempre skyblue por defecto; `color` es el único override
  const effectiveColorClass = color
    ? (colorOverrideMap[color] ?? "text-onpe-skyblue")
    : "text-onpe-skyblue";
  const showTwoButtons = buttonMode === "double";

  const handleConfirm = async () => {
    try {
      await onConfirm();
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`max-w-[719px]! pt-[30px]! pb-[30px]! px-[30px]! ${className}`}
      closeButton={false}
      closeDisabled={closeDisabled}
      zIndexLevel={zIndexLevel}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      disableFocus={disableFocus}
    >
      {/* Icono */}
      <div className="flex items-center justify-center">
        {renderIcon(type, effectiveColorClass)}
      </div>

      {/* Título */}
      <p
        id={titleId}
        className={[
          "text-lg md:text-2xl font-semibold text-center mt-0 md:mt-4",
          effectiveColorClass,
        ].join(" ")}
      >
        {title}
      </p>

      {/* Mensaje / Contenido */}
      {effectiveMessage && (
        <div
          id={messageId}
          className="mt-7 text-sm md:text-lg text-center max-w-full text-black"
        >
          {effectiveMessage}
        </div>
      )}

      {/* Mobile: apilado */}
      <div className="flex flex-col items-center justify-center w-full gap-5 mt-11 md:hidden">
        <Button
          className="w-full max-w-[200px]"
          color="red"
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

      {/* Desktop: fila */}
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
          color="red"
          title={textButtonConfirm}
          onClick={handleConfirm}
          disabled={disabledConfirmButton}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
