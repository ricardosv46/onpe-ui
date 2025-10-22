import React, { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";
import "./ModalNfc.css";

export interface ModalNfcProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  iconNfc1: ReactNode;
  iconNfc2: ReactNode;
  zIndexLevel?: number;
}

export const ModalNfc = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  iconNfc1,
  iconNfc2,
  zIndexLevel = 100,
}: ModalNfcProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`onpe-modal-nfc-container ${className}`}
      closeButton={true}
    >
      <h2 className="onpe-modal-nfc-title" tabIndex={0}>
        ¿Cómo saber si tu dispositivo móvil tiene NFC?
      </h2>

      <section className="onpe-modal-nfc-content">
        <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step" tabIndex={0}>
            <span className="onpe-modal-nfc-step-number">1. </span>
            Celular Android
          </p>
          <ul role="none" className="onpe-modal-nfc-list">
            <li role="none" className="onpe-modal-nfc-list-item" tabIndex={0}>
              Desde la barra de notificaciones, simplemente deslizando hacia
              abajo desde tu pantalla y buscando el ícono del NFC.
            </li>
            <li role="none" className="onpe-modal-nfc-list-item" tabIndex={0}>
              Otra forma es ir hacia Ajustes {"ㅤ>ㅤ"} Conexiones o Redes
              Inalámbricas {"ㅤ>ㅤ"} Buscar "NFC".
            </li>
          </ul>
        </div>
        {/* <IconNfc className="onpe-modal-nfc-icon" /> */}
        {iconNfc1}
        <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step" tabIndex={0}>
            <span className="onpe-modal-nfc-step-number">2. </span>
            Celular iPhone
          </p>
          <ul role="none" className="onpe-modal-nfc-list">
            <li role="none" className="onpe-modal-nfc-list-item" tabIndex={0}>
              Todos los modelos iPhone 7 en adelante ya cuentan con tecnología
              NFC activa.
            </li>
          </ul>
        </div>
        {/* <div className="onpe-modal-nfc-section">
          <p className="onpe-modal-nfc-step">
            <span className="onpe-modal-nfc-step-number">3. </span>
            iPad
          </p>

          <ul role="none" className="onpe-modal-nfc-list">
            <li role="none" className="onpe-modal-nfc-list-item">
              No cuentan con NFC.
            </li>
            <li role="none" className="onpe-modal-nfc-list-item">
              Para usar esta función deberás adquirir un dispostivo NFC externo
              compatible.
            </li>
          </ul>
        </div> */}
        <h2 className="onpe-modal-nfc-subtitle" tabIndex={0}>
          ¿Cómo usar el NFC correctamente?
        </h2>
        <div className="onpe-modal-nfc-instructions">
          <ol role="none" className="onpe-modal-nfc-ordered-list">
            <li role="none" tabIndex={0}>Activa el NFC en tu celular.</li>
            <li role="none" tabIndex={0}>
              Busca en internet dónde está el lector NFC según tu modelo.
            </li>
            <li role="none" tabIndex={0}>
              Coloca tu DNIe sobre esa zona hasta que recibas una confirmación
              del sistema.
            </li>
          </ol>
        </div>
        {/* <IconMobileNfc className="onpe-modal-nfc-icon-mobile" /> */}
        {iconNfc2}
      </section>
    </Modal>
  );
};

export default ModalNfc;
