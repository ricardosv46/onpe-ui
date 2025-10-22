import React, { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import "./Modal.css";
import { IconCloseRadius } from "../../icons/Actions/IconCloseRadius";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
  escapeToClose?: boolean; // Nueva prop para controlar si Escape cierra el modal
  disableFocus?: boolean; // Nueva prop para deshabilitar el focus y tabindex
  zIndexLevel?: number;
  overlayColor?:
    | "blue"
    | "skyblue"
    | "skyblue-light"
    | "yellow"
    | "light-skyblue"
    | "gray"
    | "gray-light"
    | "gray-extra-light"
    | "red"
    | "dark-gray"
    | "green"
    | "yellow-light"
    | "primary";
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  whitoutBackground = false,
  closeButton = false,
  closeDisabled = false,
  escapeToClose = true, // Por defecto Escape SÍ cierra el modal
  disableFocus = false, // Por defecto el focus SÍ está habilitado
  zIndexLevel = 100,
  overlayColor = "blue",
  ...props
}: ModalProps) => {
  // Referencias para el manejo de foco
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  // Manejar el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("onpe-modal-open");
    } else {
      document.body.classList.remove("onpe-modal-open");
    }

    // Cleanup: remover la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove("onpe-modal-open");
    };
  }, [isOpen]);

  // Resetear scroll del modal cuando se abre
  useEffect(() => {
    if (isOpen) {
      // Función para resetear scroll de cualquier modal content
      const resetModalScroll = () => {
        // Buscar todos los elementos de contenido del modal
        const modalContentElements = document.querySelectorAll(
          ".onpe-modal-content"
        );
        modalContentElements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          // Desactivar animación temporalmente para reset instantáneo
          htmlElement.style.scrollBehavior = "auto";
          htmlElement.scrollTop = 0;
          // Forzar el reset con requestAnimationFrame
          requestAnimationFrame(() => {
            htmlElement.scrollTop = 0;
            // Reactivar animación después del reset
            setTimeout(() => {
              htmlElement.style.scrollBehavior = "smooth";
            }, 10);
          });
        });
      };

      // Resetear inmediatamente cuando se abre
      resetModalScroll();

      // Resetear múltiples veces para asegurar que funcione
      setTimeout(resetModalScroll, 10);
      setTimeout(resetModalScroll, 50);
      setTimeout(resetModalScroll, 100);
      setTimeout(resetModalScroll, 200);
    } else {
      // Resetear scroll cuando se cierra para que no se vea la animación al reabrir
      const modalContentElements = document.querySelectorAll(
        ".onpe-modal-content"
      );
      modalContentElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.scrollBehavior = "auto";
        htmlElement.scrollTop = 0;
        htmlElement.style.scrollBehavior = "smooth";
      });
    }
  }, [isOpen]);

  // Manejar teclado (Escape) y foco del modal
  useEffect(() => {
    const isElementVisible = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        element.offsetParent !== null
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape solo funciona si escapeToClose es true Y closeDisabled es false
      if (e.key === "Escape" && escapeToClose && !closeDisabled) {
        onClose();
        return;
      }

      // Focus trap: Tab y Shift+Tab ciclan dentro del modal
      if (!isOpen || disableFocus || e.key !== "Tab") return;

      const wrapper = modalRef.current;
      if (!wrapper) return;

      const selector = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
      ].join(',');

      let focusable = Array.from(
        wrapper.querySelectorAll<HTMLElement>(selector)
      ).filter((el) => isElementVisible(el) && el.tabIndex !== -1);

      if (wrapper.tabIndex >= 0) {
        focusable = [wrapper, ...focusable];
      }

      if (focusable.length === 0) {
        e.preventDefault();
        wrapper.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = (document.activeElement as HTMLElement) || null;
      const isShift = e.shiftKey;

      // Si el foco está fuera del modal, iniciar en el primero
      if (!active || !wrapper.contains(active)) {
        e.preventDefault();
        (isShift ? last : first).focus();
        return;
      }

      if (!isShift && active === last) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (isShift && (active === first || active === wrapper)) {
        e.preventDefault();
        last.focus();
      }
    };

    if (isOpen && !disableFocus) {
      // Guardar el elemento activo anterior
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Enfocar el modal
      modalRef.current?.focus();

      // Agregar listener de teclado
      document.addEventListener("keydown", handleKeyDown);
    } else if (isOpen && disableFocus) {
      // Solo agregar listener de teclado, sin manejar focus
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restaurar foco al elemento anterior solo si el focus estaba habilitado
      if (!disableFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, closeDisabled, escapeToClose, disableFocus]);

  const getContainerClass = () => {
    const baseClass = "onpe-modal-container";
    if (isOpen) {
      return `${baseClass} onpe-modal-open`;
    }
    return `${baseClass} onpe-modal-closed`;
  };

  const getContentClass = () => {
    const baseClass = "onpe-modal-content";
    const backgroundClass = whitoutBackground
      ? "onpe-modal-without-background"
      : "onpe-modal-with-background";
    const customClass = props.className || "";
    return `${baseClass} ${backgroundClass} ${customClass}`.trim();
  };
  const backdropStyle = { zIndex: zIndexLevel };
  const modalWrapperStyle = { zIndex: zIndexLevel + 10 };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="onpe-modal-overlay"
              style={backdropStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className={getContainerClass()}
              style={modalWrapperStyle}
              initial={{ opacity: 0.2, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="onpe-modal-content-wrapper"
                ref={modalRef}
                tabIndex={disableFocus ? -1 : 0}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={getContentClass()}>{children}</div>
                {closeButton && (
                  <IconCloseRadius
                    onClick={onClose}
                    className="onpe-modal-close-button"
                    aria-label="Cerrar"
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
