// Provider
export { ModalGlobalProvider } from "../components/ModalGlobal/ModalGlobalProvider";

// Stores (acceso directo si se necesita)
export { useModalGlobalStore } from "../store/modalGlobal/useModalGlobalStore";
export { useModalLoadingStore } from "../store/modalGlobal/useModalLoadingStore";
export { useModalLoadingPercentageStore } from "../store/modalGlobal/useModalLoadingPercentageStore";

// Types
export type {
  ModalPayload,
  ModalResult,
  ModalType,
} from "../store/modalGlobal/useModalGlobalStore";

// Funciones utilitarias
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
