import { Modal } from "../../Modal/Modal";
import { IconSpinnerDesktop } from "../../../icons/Actions/IconSpinnerDesktop/IconSpinnerDesktop";
import { IconSpinnerMobile } from "../../../icons/Actions/IconSpinnerMobile/IconSpinnerMobile";
import { useEffect, useState } from "react";
import "./ModalLoading.css";

export interface ModalLoadingProps {
  isOpen: boolean;
  onClose?: () => void;
  message?: string;
  className?: string;
  zIndexLevel?: number;
}

export const ModalLoading = ({
  isOpen = false,
  onClose = () => {},
  message = "Cargando...",
  className = "",
  zIndexLevel = 100,
}: ModalLoadingProps) => {
  const [announceMessage, setAnnounceMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAnnounceMessage("");
      return;
    }

    // Forzar anuncio en Narrador: insertar el texto con un pequeño delay
    // para evitar perder el anuncio durante el montaje/animación del Portal.
    setAnnounceMessage("");
    const t = globalThis.setTimeout(() => {
      setAnnounceMessage(message);
    }, 150);

    return () => {
      globalThis.clearTimeout(t);
    };
  }, [isOpen, message]);

  return (
    <Modal
      disableFocus
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      closeDisabled
      whitoutBackground={true}
    >
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announceMessage}
      </div>
      <IconSpinnerDesktop
        className="onpe-modal-loading-spinner-desktop"
        aria-hidden="true"
      />
      <IconSpinnerMobile
        className="onpe-modal-loading-spinner-mobile"
        aria-hidden="true"
      />
      <p className="onpe-modal-loading-message">{message}</p>
    </Modal>
  );
};

export default ModalLoading;
