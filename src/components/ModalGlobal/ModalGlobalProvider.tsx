"use client";

import type { ReactNode } from "react";
import { useModalGlobalStore } from "../../store/modalGlobal/useModalGlobalStore";
import { useModalLoadingStore } from "../../store/modalGlobal/useModalLoadingStore";
import { useModalLoadingPercentageStore } from "../../store/modalGlobal/useModalLoadingPercentageStore";
import { ModalGlobalComponent } from "./ModalGlobalComponent";
import { ModalLoading } from "../Feedback/ModalLoading/ModalLoading";
import { ModalLoadingPercentage } from "./ModalLoadingPercentage";

interface ModalGlobalProviderProps {
  children: ReactNode;
  /** z-index for the main global modal (default: 200) */
  zIndexLevel?: number;
  /** z-index for the loading modal (default: 300) */
  zIndexLoading?: number;
  /** z-index for the loading percentage modal (default: 300) */
  zIndexLoadingPercentage?: number;
}

/**
 * Wrap your app (or layout) with this provider.
 * It renders the global modal, loading modal, and loading percentage modal via portals.
 *
 * Usage:
 * ```tsx
 * // _app.tsx or layout.tsx
 * <ModalGlobalProvider>
 *   {children}
 * </ModalGlobalProvider>
 * ```
 *
 * Then anywhere in the app:
 * ```ts
 * import {
 *   showGlobalModal,
 *   showGlobalLoading, closeGlobalLoading,
 *   showGlobalLoadingPercentage, updateGlobalLoadingPercentage, closeGlobalLoadingPercentage,
 * } from "@votodigital-onpeui/react";
 * ```
 */
export const ModalGlobalProvider = ({
  children,
  zIndexLevel = 200,
  zIndexLoading = 300,
  zIndexLoadingPercentage = 300,
}: ModalGlobalProviderProps) => {
  const { isOpen, payload, closeModal, closeModalWithResult } = useModalGlobalStore();
  const { isOpen: isLoadingOpen, message: loadingMessage } = useModalLoadingStore();
  const {
    isOpen: isLoadingPercentageOpen,
    message: loadingPercentageMessage,
    percentage,
  } = useModalLoadingPercentageStore();

  return (
    <>
      {children}

      {/* Main global modal */}
      <ModalGlobalComponent
        isOpen={isOpen}
        type={payload?.type ?? "error"}
        title={payload?.title}
        message={payload?.message}
        content={payload?.content}
        onConfirm={payload?.onConfirm}
        onCancel={payload?.onCancel}
        buttonMode={payload?.buttonMode}
        textButtonConfirm={payload?.textButtonConfirm}
        textButtonCancel={payload?.textButtonCancel}
        disabledConfirmButton={payload?.disabledConfirmButton}
        closeDisabled={payload?.closeDisabled}
        onConfirmAction={() => closeModal(true)}
        onCancelAction={() => closeModal(false)}
        onCloseAction={() => closeModalWithResult("close")}
        zIndexLevel={zIndexLevel}
      />

      {/* Global loading modal */}
      <ModalLoading
        isOpen={isLoadingOpen}
        message={loadingMessage}
        zIndexLevel={zIndexLoading}
      />

      {/* Global loading percentage modal */}
      <ModalLoadingPercentage
        isOpen={isLoadingPercentageOpen}
        message={loadingPercentageMessage}
        percentage={percentage}
        zIndexLevel={zIndexLoadingPercentage}
      />
    </>
  );
};

export default ModalGlobalProvider;
