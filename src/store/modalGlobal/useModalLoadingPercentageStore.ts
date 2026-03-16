import { create } from "zustand";

interface ModalLoadingPercentageState {
  isOpen: boolean;
  message: string;
  percentage: number;
  openLoadingPercentage: (message?: string) => void;
  updatePercentage: (percentage: number) => void;
  closeLoadingPercentage: () => void;
}

export const useModalLoadingPercentageStore = create<ModalLoadingPercentageState>((set) => ({
  isOpen: false,
  message: "Cargando...",
  percentage: 0,
  openLoadingPercentage: (message = "Cargando...") =>
    set({ isOpen: true, message, percentage: 0 }),
  updatePercentage: (percentage) =>
    set({ percentage: Math.min(100, Math.max(0, percentage)) }),
  closeLoadingPercentage: () =>
    set({ isOpen: false, message: "Cargando...", percentage: 0 }),
}));
