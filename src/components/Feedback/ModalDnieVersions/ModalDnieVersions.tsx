import React, { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";
import "./ModalDnieVersions.css";

export interface ModalDnieVersionsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  iconDnie1: ReactNode;
  iconDnie2: ReactNode;
  iconDnie3: ReactNode;
  zIndexLevel?: number;
}

export const ModalDnieVersions = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  iconDnie1,
  iconDnie2,
  iconDnie3,
  zIndexLevel = 100,
}: ModalDnieVersionsProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`onpe-modal-dnie-versions-container ${className}`}
      closeButton={true}
    >
      <h2 className="onpe-modal-dnie-versions-title" tabIndex={0}>Versiones del DNIe</h2>

      <section className="onpe-modal-dnie-versions-content">
        <article className="onpe-modal-dnie-versions-article">
          <div className="onpe-modal-dnie-versions-text">
            <p className="onpe-modal-dnie-versions-subtitle" tabIndex={0}>
              <span className="onpe-modal-dnie-versions-bold">
                DNIe versión 1
              </span>
            </p>

            <ul role="none" className="onpe-modal-dnie-versions-list">
              <li role="none">
                <p tabIndex={0}>Chip en la parte delantera del DNIe.</p>
              </li>
              <li role="none">
                <p tabIndex={0}>
                  Compatible solo con el lector del DNIe en PC, Mac o laptop.
                </p>
              </li>
            </ul>
          </div>
          <div className="onpe-modal-dnie-versions-image-container">
            {/* <IconDnie1 className="onpe-modal-dnie-versions-image" /> */}
            {iconDnie1}
          </div>
        </article>

        <article className="onpe-modal-dnie-versions-article">
          <div className="onpe-modal-dnie-versions-text">
            <p className="onpe-modal-dnie-versions-subtitle" tabIndex={0}>
              <span className="onpe-modal-dnie-versions-bold">
                DNIe versión 2 y 3
              </span>
            </p>
            <ul role="none" className="onpe-modal-dnie-versions-list">
              <li role="none">
                <p tabIndex={0}>Chip en la parte posterior del DNIe.</p>
              </li>
              <li role="none">
                <p tabIndex={0}>
                  Compatibles con el lector del DNIe en PC, Mac o laptop y
                  tecnología NFC (ISO 14443-B) en móviles.
                </p>
              </li>
            </ul>
          </div>
          <div className="onpe-modal-dnie-versions-image-container onpe-modal-dnie-versions-image-container-double">
            {/* <IconDnie2 className="onpe-modal-dnie-versions-image" /> */}
            {/* <IconDnie3 className="onpe-modal-dnie-versions-image onpe-modal-dnie-versions-image-overlay" /> */}
            {iconDnie2}
            {iconDnie3}
          </div>
        </article>
      </section>
    </Modal>
  );
};

export default ModalDnieVersions;
