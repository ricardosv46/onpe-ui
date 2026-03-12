import { useEffect, useRef, useState } from "react";
import io, { type Socket } from "socket.io-client";

const RECONNECTION_ATTEMPTS = 14;

export interface SocketEventData {
  success: boolean;
  token: string;
}

interface UseSocketConnectionParams {
  socketUrl: string;
  secure?: boolean;
  isOpenLaunchApp: boolean;
  dataOpenLaunchApp: Record<string, unknown>;
  closeLaunchApp: () => void;
  closeModal: () => void;
  onComplete?: (data: SocketEventData) => void;
  onDisconnectClient?: () => void;
  onDisconnect?: () => void;
  onMaxReconnects?: () => void;
  onConnectionChange?: (connected: boolean) => void;
  enabled?: boolean;
}

export const useSocketConnection = ({
  socketUrl,
  secure = false,
  isOpenLaunchApp,
  dataOpenLaunchApp,
  closeLaunchApp,
  closeModal,
  onComplete,
  onDisconnectClient,
  onDisconnect,
  onMaxReconnects,
  onConnectionChange,
  enabled = true,
}: UseSocketConnectionParams) => {
  const socketRef = useRef<Socket | null>(null);
  const [attempts, setAttempts] = useState(0);

  const dataOpenLaunchAppRef = useRef(dataOpenLaunchApp);
  const closeLaunchAppRef = useRef(closeLaunchApp);
  const closeModalRef = useRef(closeModal);
  const enabledRef = useRef(enabled);
  const onConnectionChangeRef = useRef(onConnectionChange);
  const onCompleteRef = useRef(onComplete);
  const onDisconnectClientRef = useRef(onDisconnectClient);
  const onDisconnectRef = useRef(onDisconnect);
  const onMaxReconnectsRef = useRef(onMaxReconnects);

  useEffect(() => {
    dataOpenLaunchAppRef.current = dataOpenLaunchApp;
    closeLaunchAppRef.current = closeLaunchApp;
    closeModalRef.current = closeModal;
    enabledRef.current = enabled;
    onConnectionChangeRef.current = onConnectionChange;
    onCompleteRef.current = onComplete;
    onDisconnectClientRef.current = onDisconnectClient;
    onDisconnectRef.current = onDisconnect;
    onMaxReconnectsRef.current = onMaxReconnects;
  }, [
    dataOpenLaunchApp,
    closeLaunchApp,
    closeModal,
    enabled,
    onConnectionChange,
    onComplete,
    onDisconnectClient,
    onDisconnect,
    onMaxReconnects,
  ]);

  useEffect(() => {
    if (attempts === RECONNECTION_ATTEMPTS) {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      closeLaunchAppRef.current();
      onConnectionChangeRef.current?.(false);
      closeModalRef.current();
      onMaxReconnectsRef.current?.();
      setTimeout(() => setAttempts(0), 0);
    }
  }, [attempts]);

  useEffect(() => {
    if (!enabled) {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
        onConnectionChangeRef.current?.(false);
        setTimeout(() => setAttempts(0), 0);
      }
      return;
    }

    if (!isOpenLaunchApp) {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(socketUrl, {
        transports: ["websocket"],
        secure,
        upgrade: false,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: RECONNECTION_ATTEMPTS,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 1000,
      });

      const socket = socketRef.current;

      const handleConnect = () => {
        if (!enabledRef.current) return;

        onConnectionChangeRef.current?.(true);
        if (socketRef.current) {
          const jsonObject = dataOpenLaunchAppRef.current;

          if (jsonObject && Object.keys(jsonObject).length > 0) {
            socketRef.current.emit("setToken", jsonObject);
          } else {
            setTimeout(() => {
              const delayedData = dataOpenLaunchAppRef.current;
              if (
                delayedData &&
                Object.keys(delayedData).length > 0 &&
                socketRef.current &&
                enabledRef.current
              ) {
                socketRef.current.emit("setToken", delayedData);
              }
            }, 100);
          }
        } else {
          console.error("Socket no está disponible para enviar token");
        }
      };

      const handleDisconnect = () => {
        if (!enabledRef.current) return;

        onConnectionChangeRef.current?.(false);
        closeLaunchAppRef.current();
        closeModalRef.current();
        onDisconnectRef.current?.();
      };

      const handleReconnectAttempt = (attemptNumber: number) => {
        setAttempts(attemptNumber);
      };

      const handleConnectError = (error: Error) => {
        console.error("Error de conexión socket:", error);
      };

      const handleComplete = (data: SocketEventData) => {
        if (!enabledRef.current) return;
        closeLaunchAppRef.current();
        onConnectionChangeRef.current?.(false);
        closeModalRef.current();
        onCompleteRef.current?.(data);
      };

      const handleServerTimeout = () => {
        if (!enabledRef.current) return;
        closeLaunchAppRef.current();
        onConnectionChangeRef.current?.(false);
        closeModalRef.current();
      };

      const handleDisconnectClient = () => {
        if (!enabledRef.current) return;
        closeLaunchAppRef.current();
        onConnectionChangeRef.current?.(false);
        closeModalRef.current();
        onDisconnectClientRef.current?.();
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("connect_error", handleConnectError);
      socket.io.on("reconnect_attempt", handleReconnectAttempt);
      socket.on("onProcessComplete", handleComplete);
      socket.on("onValidationComplete", handleComplete);
      socket.on("onProcessCompleteFirma", handleComplete);
      socket.on("onServerTimeout", handleServerTimeout);
      socket.on("onDisconnectClient", handleDisconnectClient);
    }

    return () => {
      if (socketRef.current && (!enabled || !isOpenLaunchApp)) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [enabled, isOpenLaunchApp, socketUrl, secure]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { attempts };
};
