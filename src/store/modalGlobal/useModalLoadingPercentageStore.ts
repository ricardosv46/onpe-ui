import { create } from "zustand";

interface ModalLoadingPercentageState {
  isOpen: boolean;
  message: string;
  percentage: number;
  /** ID de sesión actual — se incrementa en cada apertura */
  sessionId: number;
  openLoadingPercentage: (message?: string) => number;
  updatePercentage: (percentage: number, sessionId?: number) => void;
  closeLoadingPercentage: (sessionId?: number) => void;
}

export const useModalLoadingPercentageStore = create<ModalLoadingPercentageState>((set, get) => ({
  isOpen: false,
  message: "Cargando...",
  percentage: 0,
  sessionId: 0,
  openLoadingPercentage: (message = "Cargando...") => {
    const nextId = get().sessionId + 1;
    set({ isOpen: true, message, percentage: 0, sessionId: nextId });
    return nextId;
  },
  updatePercentage: (percentage, sessionId) => {
    if (sessionId !== undefined && sessionId !== get().sessionId) return;
    set({ percentage: Math.min(100, Math.max(0, percentage)) });
  },
  closeLoadingPercentage: (sessionId) => {
    if (sessionId !== undefined && sessionId !== get().sessionId) return;
    set({ isOpen: false, message: "Cargando...", percentage: 0 });
  },
}));
