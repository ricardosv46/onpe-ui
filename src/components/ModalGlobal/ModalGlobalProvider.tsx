"use client";

import type { ReactNode } from "react";
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

/**
 * Envuelve tu app (o layout) con este provider.
 * Renderiza ModalConfirm, ModalLoading y ModalLoadingPercentage vía portals.
 *
 * @example
 * // layout.tsx
 * <ModalGlobalProvider>
 *   {children}
 * </ModalGlobalProvider>
 *
 * // Desde cualquier parte del código:
 * import { showGlobalModal, showGlobalLoading, closeGlobalLoading } from "@votodigital-onpeui/react/modal";
 *
 * await showGlobalModal({ title: "¿Continuar?", twoButtons: true });
 * showGlobalLoading("Procesando...");
 * closeGlobalLoading();
 */
export const ModalGlobalProvider = ({
  children,
  zIndexLevel = 200,
  zIndexLoading = 300,
  zIndexLoadingPercentage = 300,
}: ModalGlobalProviderProps) => {
  const { isOpen, payload, closeModal, closeModalWithResult } =
    useModalGlobalStore();
  const { isOpen: isLoadingOpen, message: loadingMessage } =
    useModalLoadingStore();
  const {
    isOpen: isPercentageOpen,
    message: percentageMessage,
    percentage,
  } = useModalLoadingPercentageStore();

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
        type={payload?.type}
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
