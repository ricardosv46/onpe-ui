import { Modal } from "../../Modal/Modal";
import { IconSpinnerDesktop } from "../../../icons/Actions/IconSpinnerDesktop/IconSpinnerDesktop";
import { IconSpinnerMobile } from "../../../icons/Actions/IconSpinnerMobile/IconSpinnerMobile";
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
      <IconSpinnerDesktop className="onpe-modal-loading-spinner-desktop" />
      <IconSpinnerMobile className="onpe-modal-loading-spinner-mobile" />
      <p className="onpe-modal-loading-message">{message}</p>
    </Modal>
  );
};

export default ModalLoading;
