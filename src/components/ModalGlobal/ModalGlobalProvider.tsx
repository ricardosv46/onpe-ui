"use client";

import { useEffect, type ReactNode } from "react";
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
}

export const ModalGlobalProvider = ({
  children,
  zIndexLevel = 200,
  zIndexLoading = 300,
  zIndexLoadingPercentage = 300,
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
      />

      {/* Loading */}
      <ModalLoading
        isOpen={isLoadingOpen}
        message={loadingMessage}
        zIndexLevel={zIndexLoading}
      />

      {/* Loading con porcentaje */}
      <ModalLoadingPercentage
        isOpen={isPercentageOpen}
        message={percentageMessage}
        percentage={percentage}
        zIndexLevel={zIndexLoadingPercentage}
      />
    </>
  );
};

export default ModalGlobalProvider;
