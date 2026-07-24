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
}: OnpeIdModalProps) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <>
      {modalUrl && !isOpenModal && isOnline && (
        <iframe
          ref={preloadIframeRef}
          src={modalUrl}
          className="oui:hidden"
          onLoad={handlePreloadIframeReady}
          title="Precarga ONPE ID"
        />
      )}

      <Modal
        isOpen={isOpenModal && isOnline}
        onClose={onClose}
        className="oui:bg-white oui:max-w-[673px] oui:p-10 oui:relative"
        closeButton={!isOpenLaunchApp}
        closeDisabled={!isIframeLoaded}
        escapeToClose={false}
        disableFocus={disableFocus}
        existTabIndex
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
            className="oui:w-full oui:h-[410px] oui:min-[400px]:h-[390px] oui:md:h-[312px]"
            title="Aplicativo ONPEID para autenticación y registro"
          />
        )}
      </Modal>
    </>
  );
};
