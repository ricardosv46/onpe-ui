import React from "react";
import { Modal } from "../../Modal/Modal";
import "./ModalDnieVersions.css";

export interface ModalDnieVersionsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const ModalDnieVersions = ({ isOpen = false, onClose = () => {}, className = "" }: ModalDnieVersionsProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`onpe-modal-dnie-versions-container ${className}`} closeButton={true}>
      <h2 className="onpe-modal-dnie-versions-title">Versiones del DNIe</h2>

      <section className="onpe-modal-dnie-versions-content">
        <article className="onpe-modal-dnie-versions-article">
          <div className="onpe-modal-dnie-versions-text">
            <p className="onpe-modal-dnie-versions-subtitle">
              <span className="onpe-modal-dnie-versions-bold">DNIe versión 1</span>
            </p>

            <ul className="onpe-modal-dnie-versions-list">
              <li>
                <p>Chip en la parte delantera del DNIe.</p>
              </li>
              <li>
                <p>
                  Compatible solo con el lector del DNIe <span className="onpe-modal-dnie-versions-bold">en PC, Mac o laptop.</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="onpe-modal-dnie-versions-image-container">
            <img src="/src/assets/dni1.svg" alt="DNIe versión 1" className="onpe-modal-dnie-versions-image" />
          </div>
        </article>

        <article className="onpe-modal-dnie-versions-article">
          <div className="onpe-modal-dnie-versions-text">
            <p className="onpe-modal-dnie-versions-subtitle">
              <span className="onpe-modal-dnie-versions-bold">DNIe versión 2 y 3</span>
            </p>
            <ul className="onpe-modal-dnie-versions-list">
              <li>
                <p>Chip en la parte posterior del DNIe.</p>
              </li>
              <li>
                <p>
                  Compatibles con el lector del DNIe{" "}
                  <span className="onpe-modal-dnie-versions-bold">en PC, Mac o laptop y tecnología NFC (ISO 14443-B) en móviles.</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="onpe-modal-dnie-versions-image-container onpe-modal-dnie-versions-image-container-double">
            <img src="/src/assets/dni2.svg" alt="DNIe versión 2" className="onpe-modal-dnie-versions-image" />
            <img src="/src/assets/dni3.svg" alt="DNIe versión 3" className="onpe-modal-dnie-versions-image onpe-modal-dnie-versions-image-overlay" />
          </div>
        </article>
      </section>
    </Modal>
  );
};

export default ModalDnieVersions;
