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
  red: "oui:text-onpe-red",
  blue: "oui:text-onpe-blue",
  skyblue: "oui:text-onpe-skyblue",
  yellow: "oui:text-onpe-yellow",
};

function renderIcon(type: ModalType, colorClass: string): ReactNode {
  if (type === "none") return null;
  if (type === "success") {
    return (
      <IconCheck role="presentation" className={`oui:w-16 oui:h-16 ${colorClass}`} />
    );
  }
  if (type === "question") {
    return (
      <IconQuestion role="presentation" className={`oui:w-16 oui:h-16 ${colorClass}`} />
    );
  }
  if (type === "info") {
    return (
      <IconInfo role="presentation" className={`oui:w-16 oui:h-16 ${colorClass}`} />
    );
  }
  // error | warning
  return (
    <IconWarningNotRecommended
      role="presentation"
      className={`oui:w-16 oui:h-16 ${colorClass}`}
    />
  );
}

const defaultTitleByType: Record<string, string> = {
  success: "Confirmación",
  warning: "Advertencia",
  question: "Atención",
  info: "Información",
};

export interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Contenido del modal (string o JSX) */
  message?: ReactNode;
  /** Alias de message */
  content?: ReactNode;
  /** Tipo semántico: determina icono, color de título y color de botón confirmar */
  type?: ModalType;
  /**
   * "single" → un botón "Confirmar".
   * "double" → "Cancelar" + "Confirmar".
   * "confirm" → "No" + "Sí" (diálogo de confirmación Sí/No).
   */
  buttonMode?: "single" | "double" | "confirm";
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
  /** Muestra el botón X para cerrar el modal */
  closeButton?: boolean;
  /** Alinea el texto del mensaje a la izquierda (justify) en vez de centrado */
  alignJustify?: boolean;
  /** Alinea el modal al tope de la pantalla en vez de al centro */
  alignTop?: boolean;
  /** Habilita animación de entrada/salida (default: true) */
  animated?: boolean;
  /** Bloquea el scroll del body mientras el modal está abierto (default: true) */
  preventBodyScroll?: boolean;
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
  textButtonConfirm,
  textButtonCancel,
  className = "",
  zIndexLevel = 100,
  disableFocus = false,
  closeButton = false,
  alignJustify = false,
  alignTop = false,
  animated = true,
  preventBodyScroll = true,
}: ModalConfirmProps) => {
  const titleId = "modal-confirm-title";
  const messageId = "modal-confirm-message";

  const effectiveTitle = title ?? defaultTitleByType[type] ?? "";
  // Título e ícono siempre skyblue por defecto; `color` es el único override
  const effectiveColorClass = color
    ? (colorOverrideMap[color] ?? "oui:text-onpe-skyblue")
    : "oui:text-onpe-skyblue";
  const effectiveButtonMode =
    buttonMode ?? (type === "question" ? "confirm" : "single");
  const isConfirmMode = effectiveButtonMode === "confirm";
  const showTwoButtons = effectiveButtonMode === "double" || isConfirmMode;
  const confirmLabel =
    textButtonConfirm ??
    (isConfirmMode
      ? "Sí"
      : effectiveButtonMode === "double"
        ? "Confirmar"
        : "Aceptar");
  const cancelLabel = textButtonCancel ?? (isConfirmMode ? "No" : "Cancelar");

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
      className={`oui:bg-white oui:pt-[30px] oui:pb-[30px] oui:px-[30px] oui:max-w-[719px]! ${className}`}
      closeButton={closeButton}
      closeDisabled={closeDisabled}
      zIndexLevel={zIndexLevel}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      disableFocus={disableFocus}
      alignTop={alignTop}
      animated={animated}
      preventBodyScroll={preventBodyScroll}
    >
      {/* Icono */}
      <div className="oui:flex oui:items-center oui:justify-center">
        {renderIcon(type, effectiveColorClass)}
      </div>

      {/* Título */}
      <p
        id={titleId}
        className={[
          "oui:text-lg oui:md:text-2xl oui:font-semibold oui:text-center oui:mt-0 oui:md:mt-4",
          effectiveColorClass,
        ].join(" ")}
      >
        {effectiveTitle}
      </p>

      {/* Mensaje / Contenido */}
      {message &&
        (typeof message === "string" ? (
          <div
            id={messageId}
            className={`oui:mt-7 oui:w-full oui:text-sm oui:md:text-lg oui:text-black ${alignJustify ? "oui:text-justify" : "oui:text-center"}`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : (
          <div
            id={messageId}
            className={`oui:mt-7 oui:w-full oui:text-sm oui:md:text-lg oui:max-w-full oui:text-black ${alignJustify ? "oui:text-justify" : "oui:text-center"}`}
          >
            {message}
          </div>
        ))}
      {content &&
        (typeof content === "string" ? (
          <div
            id={message ? undefined : messageId}
            className={`oui:text-sm oui:w-full oui:md:text-lg oui:max-w-full oui:text-black ${alignJustify ? "oui:text-justify" : "oui:text-center"}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div
            id={message ? undefined : messageId}
            className={`oui:text-sm oui:w-full oui:md:text-lg oui:max-w-full oui:text-black ${alignJustify ? "oui:text-justify" : "oui:text-center"}`}
          >
            {content}
          </div>
        ))}

      {/* Mobile: apilado */}
      <div className="oui:flex oui:flex-col oui:items-center oui:justify-center oui:w-full oui:gap-5 oui:mt-11 oui:md:hidden">
        <Button
          className="oui:w-full oui:max-w-[200px]"
          color="red"
          title={confirmLabel}
          onClick={handleConfirm}
          disabled={disabledConfirmButton}
        />
        {showTwoButtons && (
          <Button
            className="oui:w-full oui:max-w-[200px]"
            color="skyblue"
            title={cancelLabel}
            onClick={handleCancel}
          />
        )}
      </div>

      {/* Desktop: fila */}
      <div className="oui:hidden oui:md:flex oui:md:flex-row oui:items-center oui:justify-center oui:w-full oui:gap-5 oui:mt-11">
        {showTwoButtons && (
          <Button
            className="oui:w-[200px]"
            color="skyblue"
            title={cancelLabel}
            onClick={handleCancel}
          />
        )}
        <Button
          className="oui:w-[200px]"
          color="red"
          title={confirmLabel}
          onClick={handleConfirm}
          disabled={disabledConfirmButton}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
