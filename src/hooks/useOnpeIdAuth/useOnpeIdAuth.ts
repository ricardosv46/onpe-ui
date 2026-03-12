import { useState, useCallback } from "react";

import {
  useIframeCommunication,
  useIframePreload,
  useSocketConnection,
  type SocketEventData,
} from "../onpeId";

interface UseOnpeIdAuthParams {
  socketUrl: string;
  secure?: boolean;
  navigate: (url: string) => void;
  onConnectionChange?: (connected: boolean) => void;
  onComplete?: (data: SocketEventData) => void;
  onDisconnectClient?: () => void;
  onExpiredApp?: () => void;
  onDisconnect?: () => void;
  onMaxReconnects?: () => void;
}

export const useOnpeIdAuth = ({
  socketUrl,
  secure = false,
  navigate,
  onConnectionChange,
  onComplete,
  onDisconnectClient,
  onExpiredApp,
  onDisconnect,
  onMaxReconnects,
}: UseOnpeIdAuthParams) => {
  const [isOpenLaunchApp, setIsOpenLaunchApp] = useState(false);
  const [dataOpenLaunchApp, setDataOpenLaunchApp] = useState<
    Record<string, unknown>
  >({});

  const openLaunchApp = useCallback(() => setIsOpenLaunchApp(true), []);
  const closeLaunchApp = useCallback(() => setIsOpenLaunchApp(false), []);

  const {
    modalUrl,
    setModalUrl,
    isOpenModal,
    isPreloading,
    closeModal,
    preloadIframeRef,
    iframeRef,
    handlePreloadIframeReady,
    handleModalIframeReady,
    reset: resetIframeState,
  } = useIframePreload();

  const handleClose = useCallback(() => {
    onConnectionChange?.(false);
    closeModal();
    closeLaunchApp();
    resetIframeState();
  }, [closeModal, closeLaunchApp, resetIframeState, onConnectionChange]);

  const { attempts } = useSocketConnection({
    socketUrl,
    secure,
    isOpenLaunchApp,
    dataOpenLaunchApp,
    closeLaunchApp,
    closeModal: handleClose,
    onComplete,
    onDisconnectClient,
    onDisconnect,
    onMaxReconnects,
    onConnectionChange,
    enabled: isOpenModal && !!modalUrl,
  });

  useIframeCommunication({
    onExpiredApp: () => {
      handleClose();
      onExpiredApp?.();
    },
    onOpenApp: (data) => {
      navigate(data.url!);
    },
    onLaunchApp: (data) => {
      openLaunchApp();
      setDataOpenLaunchApp((data.data as Record<string, unknown>) ?? {});
    },
  });

  return {
    modalUrl,
    setModalUrl,
    isOpenModal,
    isPreloading,
    isOpenLaunchApp,
    handleClose,
    iframeRef,
    preloadIframeRef,
    handlePreloadIframeReady,
    handleModalIframeReady,
    attempts,
    reset: resetIframeState,
  };
};
