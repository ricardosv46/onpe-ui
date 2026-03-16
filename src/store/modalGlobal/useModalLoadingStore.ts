import { create } from "zustand";

interface ModalLoadingState {
  isOpen: boolean;
  message: string;
  openLoading: (message?: string) => void;
  closeLoading: () => void;
}

export const useModalLoadingStore = create<ModalLoadingState>((set) => ({
  isOpen: false,
  message: "Cargando...",
  openLoading: (message = "Cargando...") => set({ isOpen: true, message }),
  closeLoading: () => set({ isOpen: false, message: "Cargando..." }),
}));
