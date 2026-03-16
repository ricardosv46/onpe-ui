// Provider & component
export { ModalGlobalProvider } from "../components/ModalGlobal/ModalGlobalProvider";
export { ModalGlobalComponent } from "../components/ModalGlobal/ModalGlobalComponent";

// Stores (for direct access if needed)
export { useModalGlobalStore } from "../store/modalGlobal/useModalGlobalStore";
export { useModalLoadingStore } from "../store/modalGlobal/useModalLoadingStore";
export { useModalLoadingPercentageStore } from "../store/modalGlobal/useModalLoadingPercentageStore";

// Types
export type {
  ModalPayload,
  ModalType,
  ModalResult,
  ButtonMode,
} from "../store/modalGlobal/useModalGlobalStore";

// Utility functions
export {
  showGlobalModal,
  showGlobalModalWithClose,
  closeGlobalModal,
  isGlobalModalOpen,
  isAlreadyHandled,
  showGlobalLoading,
  closeGlobalLoading,
  isGlobalLoadingOpen,
  showGlobalLoadingPercentage,
  updateGlobalLoadingPercentage,
  closeGlobalLoadingPercentage,
  isGlobalLoadingPercentageOpen,
} from "../utils/showGlobalModal";
