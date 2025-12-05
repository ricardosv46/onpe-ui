import React, { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import './Modal.css';
import { IconCloseRadius } from '../../icons/Actions/IconCloseRadius';
import { motion, AnimatePresence } from 'framer-motion';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
  escapeToClose?: boolean; // Nueva prop para controlar si Escape cierra el modal
  disableFocus?: boolean; // Nueva prop para deshabilitar el focus y tabindex
  existTabIndex?: boolean; // Nueva prop para controlar si existe el atributo tabIndex
  zIndexLevel?: number;
  overlayColor?:
    | 'blue'
    | 'skyblue'
    | 'skyblue-light'
    | 'yellow'
    | 'light-skyblue'
    | 'gray'
    | 'gray-light'
    | 'gray-extra-light'
    | 'red'
    | 'dark-gray'
    | 'green'
    | 'yellow-light'
    | 'primary';
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
  existTabIndex = true, // Por defecto el atributo tabIndex SÍ existe
  zIndexLevel = 100,
  overlayColor = 'blue',
  ...props
}: ModalProps) => {
  // Referencias para el manejo de foco
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  // Manejar el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('onpe-modal-open');
    } else {
      document.body.classList.remove('onpe-modal-open');
    }

    // Cleanup: remover la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove('onpe-modal-open');
    };
  }, [isOpen]);

  // Resetear scroll del modal cuando se abre
  useEffect(() => {
    if (isOpen) {
      // Función para resetear scroll de cualquier modal content
      const resetModalScroll = () => {
        // Buscar todos los elementos de contenido del modal
        const modalContentElements = document.querySelectorAll(
          '.onpe-modal-content'
        );
        modalContentElements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          // Desactivar animación temporalmente para reset instantáneo
          htmlElement.style.scrollBehavior = 'auto';
          htmlElement.scrollTop = 0;
          // Forzar el reset con requestAnimationFrame
          requestAnimationFrame(() => {
            htmlElement.scrollTop = 0;
            // Reactivar animación después del reset
            setTimeout(() => {
              htmlElement.style.scrollBehavior = 'smooth';
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
        '.onpe-modal-content'
      );
      modalContentElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.scrollBehavior = 'auto';
        htmlElement.scrollTop = 0;
        htmlElement.style.scrollBehavior = 'smooth';
      });
    }
  }, [isOpen]);

  // Manejar teclado (Escape) y foco del modal
  useEffect(() => {
    const isElementVisible = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      return (
        style.visibility !== 'hidden' &&
        style.display !== 'none' &&
        element.offsetParent !== null
      );
    };

    const getFocusableElements = (wrapper: HTMLElement) => {
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

      return focusable;
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (!isOpen || disableFocus) return;

      const wrapper = modalRef.current;
      if (!wrapper) return;

      const relatedTarget = e.relatedTarget as HTMLElement;

      // Si el foco se movió fuera del modal (y no es null, lo que indica que se movió fuera del documento)
      // Solo interceptar si el foco va a un elemento que no está dentro del modal
      if (relatedTarget && !wrapper.contains(relatedTarget)) {
        // Usar setTimeout para permitir que el navegador procese el evento primero
        // pero luego traer el foco de vuelta si salió del modal
        setTimeout(() => {
          const currentActive = document.activeElement as HTMLElement;
          if (!currentActive || !wrapper.contains(currentActive)) {
            const focusable = getFocusableElements(wrapper);
            if (focusable.length > 0) {
              // Mantener el foco en el último elemento enfocable del modal
              focusable[focusable.length - 1].focus();
            } else {
              wrapper.focus();
            }
          }
        }, 0);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape solo funciona si escapeToClose es true Y closeDisabled es false
      if (e.key === 'Escape' && escapeToClose && !closeDisabled) {
        onClose();
        return;
      }

      if (!isOpen || disableFocus) return;

      const wrapper = modalRef.current;
      if (!wrapper) return;

      const focusable = getFocusableElements(wrapper);
      const active = (document.activeElement as HTMLElement) || null;

      // Manejar flechas del teclado (usadas por narradores de pantalla)
      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (arrowKeys.includes(e.key)) {
        // Si el foco está dentro del modal
        if (active && wrapper.contains(active)) {
          const activeIndex = focusable.indexOf(active);

          // Si está en el primer elemento y presiona ArrowUp/ArrowLeft, prevenir salida
          if (
            (e.key === 'ArrowUp' || e.key === 'ArrowLeft') &&
            activeIndex === 0
          ) {
            e.preventDefault();
            e.stopPropagation();
            // Mantener el foco en el primer elemento o moverlo al último (comportamiento circular)
            if (focusable.length > 1) {
              focusable[focusable.length - 1].focus();
            } else {
              active.focus();
            }
            return;
          }

          // Si está en el último elemento y presiona ArrowDown/ArrowRight, prevenir salida
          if (
            (e.key === 'ArrowDown' || e.key === 'ArrowRight') &&
            activeIndex === focusable.length - 1
          ) {
            e.preventDefault();
            e.stopPropagation();
            // Mantener el foco en el último elemento o moverlo al primero (comportamiento circular)
            if (focusable.length > 1) {
              focusable[0].focus();
            } else {
              active.focus();
            }
            return;
          }

          // Monitorear si el foco sale del modal después de la navegación con flechas
          requestAnimationFrame(() => {
            const currentActive = document.activeElement as HTMLElement;
            if (!currentActive || !wrapper.contains(currentActive)) {
              // Si el foco salió del modal, traerlo de vuelta
              if (activeIndex !== -1 && focusable[activeIndex]) {
                focusable[activeIndex].focus();
              } else if (focusable.length > 0) {
                focusable[0].focus();
              } else {
                wrapper.focus();
              }
            }
          });
          return;
        } else {
          // Si el foco está fuera del modal, traerlo de vuelta inmediatamente
          e.preventDefault();
          if (focusable.length > 0) {
            // Para ArrowUp/ArrowLeft, ir al último elemento
            // Para ArrowDown/ArrowRight, ir al primer elemento
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              focusable[focusable.length - 1].focus();
            } else {
              focusable[0].focus();
            }
          } else {
            wrapper.focus();
          }
          return;
        }
      }

      // Focus trap: Tab y Shift+Tab ciclan dentro del modal
      if (e.key !== 'Tab') return;

      if (focusable.length === 0) {
        e.preventDefault();
        wrapper.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isShift = e.shiftKey;

      // Si el foco está fuera del modal, iniciar en el primero
      if (!active || !wrapper.contains(active)) {
        e.preventDefault();
        (isShift ? last : first).focus();
        return;
      }

      // Verificar si el elemento activo está en la lista de enfocables
      const activeIndex = focusable.indexOf(active);

      // Si está navegando hacia adelante (Tab) y está en el último elemento
      if (
        !isShift &&
        (active === last || activeIndex === focusable.length - 1)
      ) {
        e.preventDefault();
        first.focus();
        return;
      }

      // Si está navegando hacia atrás (Shift+Tab)
      if (isShift) {
        // Siempre prevenir el comportamiento por defecto cuando se presiona Shift+Tab dentro del modal
        e.preventDefault();

        // Si está en el primer elemento o wrapper, ir al último
        if (active === first || active === wrapper || activeIndex === 0) {
          last.focus();
        } else if (activeIndex > 0) {
          // Si no está en el primer elemento, ir al anterior
          focusable[activeIndex - 1].focus();
        } else {
          // Si no está en la lista de enfocables, ir al último
          last.focus();
        }
        return;
      }
    };

    if (isOpen && !disableFocus) {
      // Guardar el elemento activo anterior
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Enfocar el modal
      modalRef.current?.focus();

      // Agregar listeners
      document.addEventListener('keydown', handleKeyDown);
      const wrapper = modalRef.current;
      if (wrapper) {
        wrapper.addEventListener('focusout', handleFocusOut);
      }
    } else if (isOpen && disableFocus) {
      // Solo agregar listener de teclado, sin manejar focus
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const wrapper = modalRef.current;
      if (wrapper) {
        wrapper.removeEventListener('focusout', handleFocusOut);
      }
      // Restaurar foco al elemento anterior solo si el focus estaba habilitado
      if (!disableFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, closeDisabled, escapeToClose, disableFocus]);

  const getContainerClass = () => {
    const baseClass = 'onpe-modal-container';
    if (isOpen) {
      return `${baseClass} onpe-modal-open`;
    }
    return `${baseClass} onpe-modal-closed`;
  };

  const getContentClass = () => {
    const baseClass = 'onpe-modal-content';
    const backgroundClass = whitoutBackground
      ? 'onpe-modal-without-background'
      : 'onpe-modal-with-background';
    const customClass = props.className || '';
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
              className='onpe-modal-overlay'
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
                className='onpe-modal-content-wrapper'
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                {...(existTabIndex && { tabIndex: disableFocus ? -1 : 0 })}
                role='dialog'
                aria-modal='true'
                aria-labelledby={props['aria-labelledby']}
                aria-describedby={props['aria-describedby']}
                aria-label={props['aria-label']}
              >
                <div className={getContentClass()}>{children}</div>
                {closeButton && (
                  <button
                    onClick={onClose}
                    className='onpe-modal-close-button'
                    aria-label='Cerrar'
                    type='button'
                  >
                    <IconCloseRadius
                      aria-hidden='true'
                      className='w-full h-full'
                    />
                  </button>
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
