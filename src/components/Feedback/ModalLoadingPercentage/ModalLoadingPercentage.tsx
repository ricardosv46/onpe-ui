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
      <div className="bg-transparent flex-col flex items-center p-[50px]">
        <p className="text-white leading-normal text-6xl text-center mt-4">
          {message} {Math.floor(clamped)}%
        </p>
        <div className="w-[600px] h-10 bg-white inline-block">
          <div
            style={{ width: `${clamped}%` }}
            className="h-10 bg-blue border-white border-2 transition-all ease-in-out duration-300"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalLoadingPercentage;
