import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconChromeColor } from "../../../icons/Browsers/IconChromeColor/IconChromeColor";
import { IconSafariColor } from "../../../icons/Browsers/IconSafariColor/IconSafariColor";
import { IconMozillaColor } from "../../../icons/Browsers/IconMozillaColor/IconMozillaColor";
import { IconEdgeColor } from "../../../icons/Browsers/IconEdgeColor/IconEdgeColor";
import "./ModalBrowserIncompatible.css";

export interface ModalBrowserIncompatibleProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  zIndexLevel?: number;
}

export const ModalBrowserIncompatible = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  zIndexLevel = 100,
}: ModalBrowserIncompatibleProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`onpe-modal-browser-incompatible-container ${className}`}
      closeButton={true}
    >
      <div className="onpe-modal-browser-incompatible-icon-container">
        <IconWarning className="onpe-modal-browser-incompatible-icon" />
      </div>

      <p className="onpe-modal-browser-incompatible-title">Navegador no recomendado</p>

      <p className="onpe-modal-browser-incompatible-message">
        Para una mejor experiencia y mayor seguridad, debes ingresar con los siguientes navegadores:
      </p>

      <div className="onpe-modal-browser-incompatible-browsers-container">
        <IconChromeColor className="onpe-modal-browser-incompatible-browser-icon" />
        <IconSafariColor className="onpe-modal-browser-incompatible-browser-icon" />
        {/* <IconMozillaColor className="onpe-modal-browser-incompatible-browser-icon" /> */}
        <IconEdgeColor className="onpe-modal-browser-incompatible-browser-icon" />
      </div>
    </Modal>
  );
};

export default ModalBrowserIncompatible;
