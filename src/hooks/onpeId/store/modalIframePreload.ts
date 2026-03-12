import { create } from "zustand";

interface ModalIframePreloadStore {
  modalUrl: string;
  isOpenModal: boolean;
  isIframeReady: boolean;
  setModalUrl: (url: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setIsIframeReady: (ready: boolean) => void;
  reset: () => void;
}

const INITIAL_STATE: Omit<
  ModalIframePreloadStore,
  "setModalUrl" | "openModal" | "closeModal" | "setIsIframeReady" | "reset"
> = {
  modalUrl: "",
  isOpenModal: false,
  isIframeReady: false,
};

export const useModalIframePreload = create<ModalIframePreloadStore>()(
  (set) => ({
    ...INITIAL_STATE,
    setModalUrl: (url: string) => set({ modalUrl: url }),
    openModal: () => set({ isOpenModal: true }),
    closeModal: () => {
      set({
        isOpenModal: false,
        isIframeReady: false,
        modalUrl: "",
      });
    },
    setIsIframeReady: (ready: boolean) => set({ isIframeReady: ready }),
    reset: () => set(INITIAL_STATE),
  })
);
