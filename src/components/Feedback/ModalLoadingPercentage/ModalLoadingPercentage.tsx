"use client";

import type { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";

interface ModalLoadingPercentageProps {
  isOpen: boolean;
  message: string;
  percentage: number;
  zIndexLevel?: number;
  animated?: boolean;
  preventBodyScroll?: boolean;
  /** Alinea el modal al tope de la pantalla en vez de al centro */
  alignTop?: boolean;
  /** Reemplaza el contenido por defecto con un render personalizado */
  renderContent?: (percentage: number, message: string) => ReactNode;
}

export const ModalLoadingPercentage = ({
  isOpen,
  message,
  percentage,
  zIndexLevel = 300,
  animated = true,
  preventBodyScroll = true,
  alignTop = false,
  renderContent,
}: ModalLoadingPercentageProps) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <Modal
      disableFocus
      isOpen={isOpen}
      onClose={() => {}}
      closeDisabled
      whitoutBackground
      zIndexLevel={zIndexLevel}
      animated={animated}
      preventBodyScroll={preventBodyScroll}
      alignTop={alignTop}
    >
      {renderContent ? (
        renderContent(clamped, message)
      ) : (
        <div className="flex flex-col items-center gap-6 px-4 w-full max-w-xs md:max-w-sm">
          {/* Percentage number */}
          <p className="text-white text-5xl md:text-[80px] font-semibold leading-none">
            {clamped}%
          </p>

          {/* Progress bar */}
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${clamped}%` }}
              role="progressbar"
              aria-valuenow={clamped}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={message}
            />
          </div>

          {/* Message */}
          <p className="text-white text-2xl md:text-[40px] text-center leading-normal">
            {message}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ModalLoadingPercentage;
