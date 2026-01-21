import React, { useState } from "react";
import { IconWarningNotRecommended } from "../../../icons/Actions/IconWarningNotRecommended/IconWarningNotRecommended";
import { IconCloseRadius } from "../../../icons/Actions/IconCloseRadius/IconCloseRadius";
import "./NotRecommended.css";

export interface NotRecommendedProps {
  isOpenBrowserError?: boolean;
  isOpenDeviceError?: boolean;
  bottom?: number | string; // Valor en px o string válido de CSS (ej: "40px", "2rem", "10%")
  right?: number | string; // Valor en px o string válido de CSS (ej: "20px", "2rem", "10%")
}

export const NotRecommended = ({
  isOpenBrowserError = false,
  isOpenDeviceError = false,
  bottom = 40, // Valor por defecto: 40px
  right = 20, // Valor por defecto: 20px
}: NotRecommendedProps) => {
  const [isWarningClosed, setIsWarningClosed] = useState(false);

  const handleOpenWarning = () => {
    setIsWarningClosed(false);
  };

  const handleCloseWarning = () => {
    setIsWarningClosed(true);
  };

  // Determinar el ancho del contenedor
  const getContainerWidth = () => {
    if (isWarningClosed) return "60px";
    if (isOpenDeviceError) return "365px";
    return "315px";
  };

  // Determinar el ancho del contenido del mensaje
  const getMessageWidth = () => {
    if (isWarningClosed) return "0";
    if (isOpenDeviceError) return "335px";
    return "285px";
  };

  // Determinar las clases del contenedor
  const getContainerClasses = () => {
    const base = "onpe-not-recommended-container";
    return isWarningClosed
      ? `${base} onpe-not-recommended-closed`
      : `${base} onpe-not-recommended-open`;
  };

  // Determinar las clases del mensaje
  const getMessageClasses = () => {
    const base = "onpe-not-recommended-message";
    if (isWarningClosed) {
      return `${base} onpe-not-recommended-message-closed`;
    }
    return `${base} onpe-not-recommended-message-open`;
  };

  // Convertir el valor de bottom a string CSS válido
  const getBottomValue = () => {
    if (typeof bottom === "string") return bottom;
    return `${bottom}px`;
  };

  // Convertir el valor de right a string CSS válido
  const getRightValue = () => {
    if (typeof right === "string") return right;
    return `${right}px`;
  };

  return (
    <div
      className="onpe-not-recommended-wrapper"
      style={{ bottom: getBottomValue(), right: getRightValue() }}
    >
      <div
        className={getContainerClasses()}
        style={{ width: getContainerWidth() }}
      >
        {/* Icono de advertencia - siempre visible en posición fija, clickeable cuando está cerrado */}
        {isWarningClosed ? (
          <button
            onClick={handleOpenWarning}
            className="onpe-not-recommended-icon-button"
            aria-label="Abrir advertencia"
            type="button"
          >
            <IconWarningNotRecommended className="onpe-not-recommended-icon" />
          </button>
        ) : (
          <div className="onpe-not-recommended-icon-container">
            <IconWarningNotRecommended className="onpe-not-recommended-icon" />
          </div>
        )}

        {/* Contenido del mensaje - se oculta cuando está cerrado */}
        <div
          className={getMessageClasses()}
          style={{ width: getMessageWidth() }}
        >
          <div className="onpe-not-recommended-message-content">
            <p className="onpe-not-recommended-message-title">Estás usando</p>

            {isOpenDeviceError && (
              <p className="onpe-not-recommended-message-text">
                un sistema operativo no recomendado
              </p>
            )}
            {isOpenBrowserError && !isOpenDeviceError && (
              <p className="onpe-not-recommended-message-text">
                un navegador no recomendado
              </p>
            )}
          </div>
        </div>

        {/* Icono de cerrar - solo visible cuando está abierto */}
        {!isWarningClosed && (
          <button
            onClick={handleCloseWarning}
            className="onpe-not-recommended-close-button"
            aria-label="Cerrar advertencia"
            type="button"
          >
            <IconCloseRadius className="onpe-not-recommended-close-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotRecommended;
