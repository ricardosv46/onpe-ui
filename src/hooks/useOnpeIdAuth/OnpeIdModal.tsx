import { useState } from "react";

import { Modal } from "../../components/Modal";

interface OnpeIdModalProps {
  modalUrl: string;
  isOpenModal: boolean;
  isOpenLaunchApp: boolean;
  isOnline: boolean;
  onClose: () => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  preloadIframeRef: React.RefObject<HTMLIFrameElement | null>;
  handlePreloadIframeReady: () => void;
  handleModalIframeReady: () => void;
}

export const OnpeIdModal = ({
  modalUrl,
  isOpenModal,
  isOpenLaunchApp,
  isOnline,
  onClose,
  iframeRef,
  preloadIframeRef,
  handlePreloadIframeReady,
  handleModalIframeReady,
}: OnpeIdModalProps) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <>
      {modalUrl && !isOpenModal && isOnline && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- iframe onLoad es necesario para detección de precarga
        <iframe
          ref={preloadIframeRef}
          src={modalUrl}
          className="hidden"
          onLoad={handlePreloadIframeReady}
          title="Precarga ONPE ID"
        />
      )}

      <Modal
        isOpen={isOpenModal && isOnline}
        onClose={onClose}
        className="max-w-custom-673 p-10 relative"
        closeButton={!isOpenLaunchApp && isIframeLoaded}
        escapeToClose={false}
      >
        {!!modalUrl && isOnline && (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- iframe onLoad es necesario para el flujo de autenticación
          <iframe
            ref={iframeRef}
            src={modalUrl}
            onLoad={() => {
              handleModalIframeReady();
              setIsIframeLoaded(true);
            }}
            className="w-full h-[390px] md:h-[312px]"
            title="Aplicativo ONPEID para autenticación y registro"
          />
        )}
      </Modal>
    </>
  );
};
