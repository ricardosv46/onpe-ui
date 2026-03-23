import { type ReactNode, useEffect, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { IconSpinnerDesktop } from "../../../icons/Actions/IconSpinnerDesktop";
import { IconSpinnerMobile } from "../../../icons/Actions/IconSpinnerMobile";

export interface ModalLoadingProps {
  isOpen: boolean;
  onClose?: () => void;
  message?: string;
  className?: string;
  zIndexLevel?: number;
  animated?: boolean;
  preventBodyScroll?: boolean;
  /** Spinner personalizado. Si no se provee, se usa el spinner por defecto de la librería. */
  spinner?: ReactNode;
}

export const ModalLoading = ({
  isOpen = false,
  onClose = () => {},
  message = "Cargando...",
  className = "",
  zIndexLevel = 100,
  animated = true,
  preventBodyScroll = true,
  spinner,
}: ModalLoadingProps) => {
  const [announceMessage, setAnnounceMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAnnounceMessage("");
      return;
    }
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
      animated={animated}
      preventBodyScroll={preventBodyScroll}
    >
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announceMessage}
      </div>
      {spinner ?? (
        <>
          <IconSpinnerDesktop
            className="hidden md:block text-white animate-spin"
            aria-hidden="true"
          />
          <IconSpinnerMobile
            className="block md:hidden text-white animate-spin"
            aria-hidden="true"
          />
        </>
      )}
      <p
        className={`text-white leading-normal text-2xl md:text-[64px] text-center ${spinner ? "mt-5" : "mt-10 md:mt-20"}`}
      >
        {message}
      </p>
    </Modal>
  );
};

export default ModalLoading;
