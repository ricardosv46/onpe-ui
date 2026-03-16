import { create } from "zustand";
import type { ReactNode } from "react";

export type ModalType = "error" | "success" | "warning" | "question";
export type ModalResult = "confirm" | "cancel" | "close";
export type ButtonMode = "single" | "double";

export interface ModalPayload {
  type?: ModalType;
  title?: string;
  /** Plain text or simple string message */
  message?: string;
  /** Custom JSX content — replaces message when provided */
  content?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  buttonMode?: ButtonMode;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  disabledConfirmButton?: boolean;
  closeDisabled?: boolean;
  /**
   * Mark this modal as handled by axios interceptor.
   * When true, route-change handlers should NOT auto-close it.
   */
  alreadyHandled?: boolean;
}

interface ModalGlobalState {
  isOpen: boolean;
  payload: ModalPayload | null;
  modalId: number;
  _resolve: ((result: boolean) => void) | null;
  _resolveWithClose: ((result: ModalResult) => void) | null;

  openModal: (payload: ModalPayload) => Promise<boolean>;
  openModalWithClose: (payload: ModalPayload) => Promise<ModalResult>;
  closeModal: (confirmed?: boolean) => void;
  closeModalWithResult: (result: ModalResult) => void;
}

export const useModalGlobalStore = create<ModalGlobalState>((set, get) => ({
  isOpen: false,
  payload: null,
  modalId: 0,
  _resolve: null,
  _resolveWithClose: null,

  openModal: (payload) => {
    return new Promise<boolean>((resolve) => {
      set((state) => ({
        isOpen: true,
        payload,
        modalId: state.modalId + 1,
        _resolve: resolve,
        _resolveWithClose: null,
      }));
    });
  },

  openModalWithClose: (payload) => {
    return new Promise<ModalResult>((resolve) => {
      set((state) => ({
        isOpen: true,
        payload,
        modalId: state.modalId + 1,
        _resolve: null,
        _resolveWithClose: resolve,
      }));
    });
  },

  closeModal: (confirmed = false) => {
    const { _resolve, _resolveWithClose } = get();
    _resolve?.(confirmed);
    _resolveWithClose?.(confirmed ? "confirm" : "cancel");
    set({ isOpen: false, payload: null, _resolve: null, _resolveWithClose: null });
  },

  closeModalWithResult: (result) => {
    const { _resolve, _resolveWithClose } = get();
    _resolve?.(result === "confirm");
    _resolveWithClose?.(result);
    set({ isOpen: false, payload: null, _resolve: null, _resolveWithClose: null });
  },
}));
