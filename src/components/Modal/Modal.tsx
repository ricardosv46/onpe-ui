import React, { HTMLAttributes, ReactNode, useEffect } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { IconClose } from "../../icons/Actions/IconClose";
import "./Modal.css";
import { IconCloseRadius } from "../../icons/Actions/IconCloseRadius";

const classNames = (cln: Array<string | undefined>) => {
  return cln.join(" ").trim();
};

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
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
  zIndexLevel = 1000,
  overlayColor = "blue",
  ...props
}: ModalProps) => {
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
        const modalContentElements = document.querySelectorAll(".onpe-modal-content");
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
      const modalContentElements = document.querySelectorAll(".onpe-modal-content");
      modalContentElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.scrollBehavior = "auto";
        htmlElement.scrollTop = 0;
        htmlElement.style.scrollBehavior = "smooth";
      });
    }
  }, [isOpen]);

  const getContainerClass = () => {
    const baseClass = "onpe-modal-container";
    if (isOpen) {
      return `${baseClass} onpe-modal-open`;
    }
    return `${baseClass} onpe-modal-closed`;
  };

  const getContentClass = () => {
    const baseClass = "onpe-modal-content";
    const backgroundClass = whitoutBackground ? "onpe-modal-without-background" : "onpe-modal-with-background";
    const customClass = props.className || "";
    return `${baseClass} ${backgroundClass} ${customClass}`.trim();
  };

  return (
    <Portal>
      <div className={getContainerClass()} style={{ zIndex: zIndexLevel }}>
        <Overlay show={isOpen} onClick={closeDisabled ? undefined : onClose} color={overlayColor} />
        <div className="onpe-modal-content-wrapper">
          <div className={getContentClass()}>{children}</div>
          {closeButton && <IconCloseRadius onClick={onClose} className="onpe-modal-close-button" aria-label="Cerrar" />}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
