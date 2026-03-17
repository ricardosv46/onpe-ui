import { create } from "zustand";
import type { ReactNode } from "react";
import type { ModalType } from "../../components/Feedback/ModalConfirm/ModalConfirm";

export type { ModalType };

export type ModalResult = "confirm" | "cancel" | "close";

/**
 * Payload del modal global.
 * Combina los props de ModalGlobalComponent (type, buttonMode, content)
 * con los de ModalConfirm (icon, color, twoButtons).
 * Los props del global component predominan; color e icon son overrides manuales.
 */
export interface ModalPayload {
  title?: string;
  /** Contenido del modal (string o JSX). Alias: content */
  message?: ReactNode;
  /** Alias de message para compatibilidad */
  content?: ReactNode;
  /** Tipo semántico: determina icono y color */
  type: ModalType;
  /**
   * Override del icono independiente del `type`.
   * Usa los mismos valores que `type`. Si se provee, tiene prioridad sobre `type` para el icono.
   */
  iconType?: ModalType;
  /**
   * "single" → un botón "Confirmar".
   * "double" → "Cancelar" + "Confirmar".
   * "confirm" → "No" + "Sí" (diálogo de confirmación).
   */
  buttonMode?: "single" | "double" | "confirm";
  /** Deshabilita el botón confirmar */
  disabledConfirmButton?: boolean;
  /** Deshabilita el cierre del modal */
  closeDisabled?: boolean;
  /** Override manual del color del icono y título */
  color?: "red" | "blue" | "skyblue" | "yellow";
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  /** Muestra el botón X para cerrar el modal */
  closeButton?: boolean;
  /** Alinea el texto del mensaje a la izquierda (justify) en vez de centrado */
  alignJustify?: boolean;
  /** Alinea el modal al tope de la pantalla en vez de al centro */
  top?: boolean;
  /**
   * Tiempo en ms para auto-confirmar el modal (ej: 30000 = 30s).
   * Útil para modales de error de sesión/red que deben cerrarse solos.
   */
  autoConfirmTimeout?: number;
  /**
   * Marca este modal como controlado por axios interceptor.
   * Cuando es true, los handlers de cambio de ruta NO deben cerrarlo.
   */
  alreadyHandled?: boolean;
}

interface ModalGlobalState {
  isOpen: boolean;
  payload: ModalPayload | null;
  modalId: number;
  /** true cuando fue abierto con openModalWithClose (3 estados) */
  isTriState: boolean;
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
  isTriState: false,
  _resolve: null,
  _resolveWithClose: null,

  openModal: (payload) => {
    return new Promise<boolean>((resolve) => {
      set((state) => ({
        isOpen: true,
        payload,
        modalId: state.modalId + 1,
        isTriState: false,
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
        isTriState: true,
        _resolve: null,
        _resolveWithClose: resolve,
      }));
    });
  },

  closeModal: (confirmed = false) => {
    const { _resolve, _resolveWithClose } = get();
    _resolve?.(confirmed);
    _resolveWithClose?.(confirmed ? "confirm" : "cancel");
    set({ isOpen: false, payload: null, isTriState: false, _resolve: null, _resolveWithClose: null });
  },

  closeModalWithResult: (result) => {
    const { _resolve, _resolveWithClose } = get();
    _resolve?.(result === "confirm");
    _resolveWithClose?.(result);
    set({ isOpen: false, payload: null, isTriState: false, _resolve: null, _resolveWithClose: null });
  },
}));
