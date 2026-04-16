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
  disableFocus?: boolean;
  existTabIndex?: boolean;
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
  disableFocus = false,
  existTabIndex = false,
}: OnpeIdModalProps) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <>
      {modalUrl && !isOpenModal && isOnline && (
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
        className="bg-white max-w-custom-673 p-10 relative"
        closeButton={!isOpenLaunchApp && isIframeLoaded}
        escapeToClose={false}
        disableFocus={disableFocus}
        existTabIndex={existTabIndex}
        aria-label="Autenticación ONPE ID"
      >
        {!!modalUrl && isOnline && (
          <iframe
            ref={iframeRef}
            src={modalUrl}
            onLoad={() => {
              handleModalIframeReady();
              setIsIframeLoaded(true);
            }}
            className="w-full h-[410px] min-[400px]:h-[390px] md:h-[312px]"
            title="Aplicativo ONPEID para autenticación y registro"
          />
        )}
      </Modal>
    </>
  );
};
