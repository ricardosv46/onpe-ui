import { create } from "zustand";

interface ModalLoadingState {
  isOpen: boolean;
  message: string;
  sessionId: number;
  openLoading: (message?: string) => number;
  closeLoading: (sessionId?: number) => void;
}

export const useModalLoadingStore = create<ModalLoadingState>((set, get) => ({
  isOpen: false,
  message: "Cargando...",
  sessionId: 0,
  openLoading: (message = "Cargando...") => {
    const nextId = get().sessionId + 1;
    set({ isOpen: true, message, sessionId: nextId });
    return nextId;
  },
  closeLoading: (sessionId) => {
    if (sessionId !== undefined && sessionId !== get().sessionId) return;
    set({ isOpen: false, message: "Cargando..." });
  },
}));
