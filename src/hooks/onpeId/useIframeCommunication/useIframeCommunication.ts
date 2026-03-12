import { useEffect, useRef, useCallback } from "react";

export type MessageStatus = "EXPIRED_APP" | "OPEN_APP" | "LAUNCH_APP";

export interface IframeMessage {
  status: MessageStatus;
  url?: string;
  data?: unknown;
  token?: string;
}

interface UseIframeCommunicationParams {
  onExpiredApp?: (data: IframeMessage) => void;
  onOpenApp?: (data: IframeMessage) => void;
  onLaunchApp?: (data: IframeMessage) => void;
  enabled?: boolean;
  allowedOrigin?: string;
}

export const useIframeCommunication = ({
  onExpiredApp,
  onOpenApp,
  onLaunchApp,
  enabled = true,
  allowedOrigin,
}: UseIframeCommunicationParams = {}) => {
  const handlersRef = useRef({
    onExpiredApp,
    onOpenApp,
    onLaunchApp,
  });

  useEffect(() => {
    handlersRef.current = {
      onExpiredApp,
      onOpenApp,
      onLaunchApp,
    };
  }, [onExpiredApp, onOpenApp, onLaunchApp]);

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MessageEvent) => {
      if (allowedOrigin && event.origin !== allowedOrigin) {
        console.warn(
          `Mensaje rechazado de origen no permitido: ${event.origin}`
        );
        return;
      }

      const data = event.data as IframeMessage;
      if (!data?.status) return;

      const handlers = handlersRef.current;

      switch (data.status) {
        case "EXPIRED_APP":
          handlers.onExpiredApp?.(data);
          break;
        case "OPEN_APP":
          handlers.onOpenApp?.(data);
          break;
        case "LAUNCH_APP":
          handlers.onLaunchApp?.(data);
          break;
        default:
          break;
      }
    };

    globalThis.addEventListener("message", handler);
    return () => globalThis.removeEventListener("message", handler);
  }, [enabled, allowedOrigin]);
};

interface UseSendMessageToIframeParams {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  modalUrl: string;
}

export const useSendMessageToIframe = ({
  iframeRef,
  modalUrl,
}: UseSendMessageToIframeParams) => {
  const sendMessageToIframe = useCallback(
    (message: Record<string, unknown>) => {
      if (!iframeRef.current || !modalUrl) return;

      try {
        const iframeOrigin = new URL(modalUrl).origin;
        iframeRef.current.contentWindow?.postMessage(message, iframeOrigin);
      } catch (error) {
        console.error("Error al enviar mensaje al iframe:", error);
      }
    },
    [iframeRef, modalUrl]
  );

  return { sendMessageToIframe };
};
