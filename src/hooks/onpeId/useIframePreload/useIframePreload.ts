import { useRef } from "react";

import { useModalIframePreload } from "../store/modalIframePreload";

export const useIframePreload = () => {
  const {
    modalUrl,
    setModalUrl,
    isOpenModal,
    closeModal,
    setIsIframeReady,
    openModal,
    reset,
  } = useModalIframePreload();

  const preloadIframeRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isPreloading = !!modalUrl && !isOpenModal;

  const handlePreloadIframeReady = () => {
    setIsIframeReady(true);
    openModal();
  };

  const handleModalIframeReady = () => {
    if (!useModalIframePreload.getState().isIframeReady) {
      setIsIframeReady(true);
    }
  };

  return {
    modalUrl,
    setModalUrl,
    isOpenModal,
    closeModal,
    isPreloading,
    preloadIframeRef,
    iframeRef,
    handlePreloadIframeReady,
    handleModalIframeReady,
    reset,
  };
};
