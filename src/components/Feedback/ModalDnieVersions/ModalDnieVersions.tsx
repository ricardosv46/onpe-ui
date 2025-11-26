import React, { ReactNode } from 'react';
import { Modal } from '../../Modal/Modal';
import './ModalDnieVersions.css';

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
  className = '',
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
      <h2 className='onpe-modal-dnie-versions-title' tabIndex={0}>
        <span className='sr-only'>Versiones del DNI electrónico</span>
        <span aria-hidden='true'>Versiones del DNIe</span>
      </h2>

      <section className='onpe-modal-dnie-versions-content'>
        <article className='onpe-modal-dnie-versions-article'>
          <div className='onpe-modal-dnie-versions-text'>
            <p className='onpe-modal-dnie-versions-subtitle' tabIndex={0}>
              <span className='onpe-modal-dnie-versions-bold'>
                <span className='sr-only'>DNI electrónico versión 1</span>
                <span aria-hidden='true'>DNIe versión 1</span>
              </span>
            </p>

            <ul role='none' className='onpe-modal-dnie-versions-list'>
              <li role='none'>
                <p tabIndex={0}>
                  <span className='sr-only'>
                    Chip en la parte delantera del DNI electrónico.
                  </span>
                  <span aria-hidden='true'>
                    Chip en la parte delantera del DNIe.
                  </span>
                </p>
              </li>
              <li role='none'>
                <p tabIndex={0}>
                  <span className='sr-only'>
                    Compatible solo con el lector del DNI electrónico en PC, Mac
                    o laptop.
                  </span>
                  <span aria-hidden='true'>
                    Compatible solo con el lector del DNIe en PC, Mac o laptop.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className='onpe-modal-dnie-versions-image-container'>
            {/* <IconDnie1 className="onpe-modal-dnie-versions-image" /> */}
            {iconDnie1}
          </div>
        </article>

        <article className='onpe-modal-dnie-versions-article'>
          <div className='onpe-modal-dnie-versions-text'>
            <p className='onpe-modal-dnie-versions-subtitle' tabIndex={0}>
              <span className='onpe-modal-dnie-versions-bold'>
                <span className='sr-only'>DNI electrónico versión 2 y 3</span>
                <span aria-hidden='true'>DNIe versión 2 y 3</span>
              </span>
            </p>
            <ul role='none' className='onpe-modal-dnie-versions-list'>
              <li role='none'>
                <p tabIndex={0}>
                  <span className='sr-only'>
                    Chip en la parte posterior del DNI electrónico.
                  </span>
                  <span aria-hidden='true'>
                    Chip en la parte posterior del DNIe.
                  </span>
                </p>
              </li>
              <li role='none'>
                <p tabIndex={0}>
                  <span className='sr-only'>
                    Compatibles con el lector del DNI electrónico en PC, Mac o
                    laptop y tecnología NFC (ISO 14443-B) en móviles.
                  </span>
                  <span aria-hidden='true'>
                    Compatibles con el lector del DNIe en PC, Mac o laptop y
                    tecnología NFC (ISO 14443-B) en móviles.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className='onpe-modal-dnie-versions-image-container onpe-modal-dnie-versions-image-container-double'>
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
