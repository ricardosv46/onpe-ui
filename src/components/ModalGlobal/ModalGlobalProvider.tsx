"use client";

import { type ReactNode, useEffect } from "react";
import { useModalGlobalStore } from "../../store/modalGlobal/useModalGlobalStore";
import { useModalLoadingStore } from "../../store/modalGlobal/useModalLoadingStore";
import { useModalLoadingPercentageStore } from "../../store/modalGlobal/useModalLoadingPercentageStore";
import { ModalConfirm } from "../Feedback/ModalConfirm/ModalConfirm";
import { ModalLoading } from "../Feedback/ModalLoading/ModalLoading";
import { ModalLoadingPercentage } from "../Feedback/ModalLoadingPercentage/ModalLoadingPercentage";

interface ModalGlobalProviderProps {
  children: ReactNode;
  /** z-index del modal principal (default: 200) */
  zIndexLevel?: number;
  /** z-index del modal de loading (default: 300) */
  zIndexLoading?: number;
  /** z-index del modal de loading con porcentaje (default: 300) */
  zIndexLoadingPercentage?: number;
  /** Habilita animación de entrada/salida en todos los modales (default: true) */
  animated?: boolean;
  /** Bloquea el scroll del body en todos los modales (default: true) */
  preventBodyScroll?: boolean;
  /** Spinner personalizado para ModalLoading. Si no se provee, se usa el spinner por defecto. */
  loadingSpinner?: ReactNode;
  /** Alinea el ModalLoadingPercentage al tope de la pantalla (default: false) */
  loadingPercentageAlignTop?: boolean;
  /** Reemplaza el contenido del ModalLoadingPercentage con un render personalizado */
  loadingPercentageContent?: (percentage: number, message: string) => ReactNode;
}

export const ModalGlobalProvider = ({
  children,
  zIndexLevel = 200,
  zIndexLoading = 300,
  zIndexLoadingPercentage = 300,
  animated = true,
  preventBodyScroll = true,
  loadingSpinner,
  loadingPercentageAlignTop = false,
  loadingPercentageContent,
}: ModalGlobalProviderProps) => {
  const { isOpen, payload, modalId, isTriState, closeModal, closeModalWithResult } =
    useModalGlobalStore();
  const { isOpen: isLoadingOpen, message: loadingMessage } =
    useModalLoadingStore();
  const {
    isOpen: isPercentageOpen,
    message: percentageMessage,
    percentage,
  } = useModalLoadingPercentageStore();

  // Auto-confirmar el modal después del timeout especificado
  useEffect(() => {
    if (!isOpen || !payload?.autoConfirmTimeout) return;

    const timerId = setTimeout(async () => {
      await payload?.onConfirm?.();
      closeModal(true);
    }, payload.autoConfirmTimeout);

    return () => clearTimeout(timerId);
  }, [isOpen, modalId]);

  return (
    <>
      {children}

      {/* Modal principal — usa ModalConfirm de la librería directamente */}
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => closeModalWithResult("close")}
        title={payload?.title ?? ""}
        message={payload?.message}
        content={payload?.content}
        type={payload?.iconType ?? payload?.type}
        buttonMode={payload?.buttonMode}
        disabledConfirmButton={payload?.disabledConfirmButton}
        closeDisabled={payload?.closeDisabled}
        color={payload?.color}
        onConfirm={async () => {
          await payload?.onConfirm?.();
          closeModal(true);
        }}
        onCancel={() => {
          payload?.onCancel?.();
          closeModal(false);
        }}
        withoutAutoClose
        textButtonConfirm={payload?.textButtonConfirm}
        textButtonCancel={payload?.textButtonCancel}
        closeButton={payload?.closeButton ?? isTriState}
        alignJustify={payload?.alignJustify}
        alignTop={payload?.top}
        zIndexLevel={zIndexLevel}
        animated={animated}
        preventBodyScroll={preventBodyScroll}
      />

      {/* Loading */}
      <ModalLoading
        isOpen={isLoadingOpen}
        message={loadingMessage}
        zIndexLevel={zIndexLoading}
        animated={animated}
        preventBodyScroll={preventBodyScroll}
        spinner={loadingSpinner}
      />

      {/* Loading con porcentaje */}
      <ModalLoadingPercentage
        isOpen={isPercentageOpen}
        message={percentageMessage}
        percentage={percentage}
        zIndexLevel={zIndexLoadingPercentage}
        animated={animated}
        preventBodyScroll={preventBodyScroll}
        alignTop={loadingPercentageAlignTop}
        renderContent={loadingPercentageContent}
      />
    </>
  );
};

export default ModalGlobalProvider;
