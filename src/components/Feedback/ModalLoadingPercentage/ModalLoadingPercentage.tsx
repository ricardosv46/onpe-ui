"use client";

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
}

export const ModalLoadingPercentage = ({
  isOpen,
  message,
  percentage,
  zIndexLevel = 300,
  animated = true,
  preventBodyScroll = true,
  alignTop = false,
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
      <div className="oui:bg-transparent oui:flex-col oui:flex oui:items-center oui:p-[50px]">
        <p className="oui:text-white oui:leading-normal oui:text-6xl oui:text-center oui:mt-4">
          {message} {Math.floor(clamped)}%
        </p>
        <div className="oui:w-[600px] oui:h-10 oui:bg-white oui:inline-block">
          <div
            style={{ width: `${clamped}%` }}
            className="oui:h-10 oui:bg-onpe-blue oui:border-white oui:border-2 oui:transition-all oui:ease-in-out oui:duration-300"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalLoadingPercentage;
