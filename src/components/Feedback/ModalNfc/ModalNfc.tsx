import React from "react";
import { Modal } from "../../Modal/Modal";
import { IconMobileNfc } from "../../../icons/Actions/IconMobileNfc/IconMobileNfc";
import "./ModalNfc.css";

export interface ModalNfcProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const ModalNfc = ({ isOpen = false, onClose = () => {}, className = "" }: ModalNfcProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`onpe-modal-nfc-container ${className}`} closeButton={true}>
      <h2 className="onpe-modal-nfc-title">¿Cómo saber si mi teléfono tiene NFC?</h2>

      <section className="onpe-modal-nfc-content">
        <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step">
            <span className="onpe-modal-nfc-step-number">1. </span>
            Teléfono / Tablet Android
          </p>
          <ul className="onpe-modal-nfc-list">
            <li className="onpe-modal-nfc-list-item">
              Desde la barra de notificaciones, simplemente deslizando hacia abajo desde tu pantalla y buscando el ícono del NFC.
            </li>
            <li className="onpe-modal-nfc-list-item">
              Otra forma es ir hacia Ajustes {"ㅤ>ㅤ"} Conexiones o Redes Inalámbricas {"ㅤ>ㅤ"} Buscar "NFC".
            </li>
          </ul>
        </div>

        <img src="/src/assets/nfc.svg" alt="NFC" className="onpe-modal-nfc-image" />

        <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step">
            <span className="onpe-modal-nfc-step-number">2. </span>
            Teléfono iPhone
          </p>

          <p className="onpe-modal-nfc-text">
            En el sistema iOS es fácil ya que todos los modelos iPhone a partir del iPhone 6 tienen NFC, es más, desde la actualización a iOS 13 o iOS
            14, todos los modelos iPhone 7 y superiores pueden leer y escribir una etiqueta NFC.
          </p>
        </div>

        <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step">
            <span className="onpe-modal-nfc-step-number">3. </span>
            iPad
          </p>

          <p className="onpe-modal-nfc-text">
            Los modelos iPad no poseen NFC, para utilizar este dispositivo necesitarás adquirir un dispositivo NFC compatible.
          </p>
        </div>

        <h2 className="onpe-modal-nfc-subtitle">¿Cómo utilizar tu NFC correctamente?</h2>

        <div className="onpe-modal-nfc-instructions">
          <ol className="onpe-modal-nfc-ordered-list">
            <li>Activa el NFC en tu celular.</li>
            <li>Busca en internet dónde está el lector NFC según tu modelo.</li>
            <li>Coloca tu DNIe sobre esa zona hasta que recibas una confirmación o respuesta por parte del sistema.</li>
          </ol>
        </div>

        <IconMobileNfc className="onpe-modal-nfc-icon" />
      </section>
    </Modal>
  );
};

export default ModalNfc;
