import React, { HTMLAttributes, ReactNode, useEffect } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { IconClose } from "../../icons/Actions/IconClose";
import "./Modal.css";

const classNames = (cln: Array<string | undefined>) => {
  return cln.join(" ").trim();
};

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  topAbsolute?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
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
  topAbsolute = false,
  closeButton = false,
  closeDisabled = false,
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
      // Resetear inmediatamente cuando se abre
      const modalContentElement = document.querySelector(".onpe-modal-content.onpe-modal-with-background") as HTMLElement;
      if (modalContentElement) {
        // Desactivar animación temporalmente para reset instantáneo
        modalContentElement.style.scrollBehavior = "auto";
        modalContentElement.scrollTop = 0;
        // Reactivar animación después del reset
        setTimeout(() => {
          modalContentElement.style.scrollBehavior = "smooth";
        }, 10);
      }

      // También resetear después de un pequeño delay por si acaso
      setTimeout(() => {
        const modalContentElementDelayed = document.querySelector(".onpe-modal-content.onpe-modal-with-background") as HTMLElement;
        if (modalContentElementDelayed) {
          modalContentElementDelayed.style.scrollBehavior = "auto";
          modalContentElementDelayed.scrollTop = 0;
          setTimeout(() => {
            modalContentElementDelayed.style.scrollBehavior = "smooth";
          }, 10);
        }
      }, 50);
    } else {
      // Resetear scroll cuando se cierra para que no se vea la animación al reabrir
      const modalContentElement = document.querySelector(".onpe-modal-content.onpe-modal-with-background") as HTMLElement;
      if (modalContentElement) {
        modalContentElement.style.scrollBehavior = "auto";
        modalContentElement.scrollTop = 0;
        modalContentElement.style.scrollBehavior = "smooth";
      }
    }
  }, [isOpen]);

  const getContainerClass = () => {
    const baseClass = "onpe-modal-container";
    if (isOpen) {
      return topAbsolute ? `${baseClass} onpe-modal-open onpe-modal-top-absolute` : `${baseClass} onpe-modal-open`;
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
      <div className={getContainerClass()}>
        <Overlay show={isOpen} onClick={closeDisabled ? undefined : onClose} color={overlayColor} />
        <div className="onpe-modal-content-wrapper">
          <div className={getContentClass()}>{children}</div>
          {closeButton && (
            <button onClick={onClose} className="onpe-modal-close-button" aria-label="Cerrar">
              <IconClose className="onpe-modal-close-icon" />
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
