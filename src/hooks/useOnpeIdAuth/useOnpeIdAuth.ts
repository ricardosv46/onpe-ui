import { useState, useCallback, useEffect } from "react";

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
  connectionApp?: boolean;
  onPageReload?: () => void;
  onComplete?: (data: SocketEventData) => void;
  onDisconnectClient?: () => void;
  onExpiredApp?: () => void;
  onDisconnect?: () => void;
  onMaxReconnects?: () => void;
  onHomeApp?: () => void;
  onNotApp?: () => void;
  onOpenMobile?: (data: Record<string, unknown>) => void;
  isSessionExpired?: boolean;
}

export const useOnpeIdAuth = ({
  socketUrl,
  secure = false,
  navigate,
  onConnectionChange,
  connectionApp,
  onPageReload,
  onComplete,
  onHomeApp,
  onNotApp,
  onDisconnectClient,
  isSessionExpired,
  onExpiredApp,
  onDisconnect,
  onMaxReconnects,
  onOpenMobile,
}: UseOnpeIdAuthParams) => {
  const [isOpenLaunchApp, setIsOpenLaunchApp] = useState(false);
  const [dataOpenLaunchApp, setDataOpenLaunchApp] = useState<
    Record<string, unknown>
  >({});

  const openLaunchApp = useCallback(() => setIsOpenLaunchApp(true), []);
  const closeLaunchApp = useCallback(() => setIsOpenLaunchApp(false), []);
  console.log({ isSessionExpired });
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

  useEffect(() => {
    if (connectionApp) {
      onConnectionChange?.(false);
      onPageReload?.();
    }
    return () => {
      resetIframeState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo se ejecuta en el primer render
  }, []);

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
    isSessionExpired,
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
    onOpenMobile: (data) => {
      onOpenMobile?.((data.data as Record<string, unknown>) ?? {});
    },
    onHomeApp: () => {
      handleClose();
      onHomeApp?.();
    },
    onNotApp: () => {
      handleClose();
      onNotApp?.();
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
