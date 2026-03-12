import { renderHook } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";

import {
  useIframeCommunication,
  useSendMessageToIframe,
} from "./useIframeCommunication";

describe("useIframeCommunication", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("ejecuta el handler correcto según status", () => {
    const onExpiredApp = vi.fn();
    const onOpenApp = vi.fn();

    renderHook(() => useIframeCommunication({ onExpiredApp, onOpenApp }));

    globalThis.dispatchEvent(
      new MessageEvent("message", {
        data: { status: "EXPIRED_APP" },
        origin: "http://localhost:3001",
      }),
    );

    expect(onExpiredApp).toHaveBeenCalledTimes(1);
    expect(onOpenApp).not.toHaveBeenCalled();
  });

  test("rechaza mensajes de origen no permitido cuando allowedOrigin está definido", () => {
    const onExpiredApp = vi.fn();
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderHook(() =>
      useIframeCommunication({
        onExpiredApp,
        allowedOrigin: "https://allowed.test",
      }),
    );

    globalThis.dispatchEvent(
      new MessageEvent("message", {
        data: { status: "EXPIRED_APP" },
        origin: "https://not-allowed.test",
      }),
    );

    expect(onExpiredApp).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  test("no hace nada cuando enabled=false", () => {
    const onExpiredApp = vi.fn();

    renderHook(() => useIframeCommunication({ onExpiredApp, enabled: false }));

    globalThis.dispatchEvent(
      new MessageEvent("message", {
        data: { status: "EXPIRED_APP" },
        origin: "http://localhost:3001",
      }),
    );

    expect(onExpiredApp).not.toHaveBeenCalled();
  });

  test("ejecuta onHomeApp cuando status es HOME_APP", () => {
    const onHomeApp = vi.fn();

    renderHook(() => useIframeCommunication({ onHomeApp }));

    globalThis.dispatchEvent(
      new MessageEvent("message", {
        data: { status: "HOME_APP" },
        origin: "http://localhost:3001",
      }),
    );

    expect(onHomeApp).toHaveBeenCalledTimes(1);
  });

  test("ejecuta onNotApp cuando status es NOT_APP", () => {
    const onNotApp = vi.fn();

    renderHook(() => useIframeCommunication({ onNotApp }));

    globalThis.dispatchEvent(
      new MessageEvent("message", {
        data: { status: "NOT_APP" },
        origin: "http://localhost:3001",
      }),
    );

    expect(onNotApp).toHaveBeenCalledTimes(1);
  });
});

describe("useSendMessageToIframe", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("envía postMessage al origin del iframe", () => {
    const iframe = document.createElement("iframe");
    const postMessage = vi.fn();

    Object.defineProperty(iframe, "contentWindow", {
      value: { postMessage },
      writable: true,
    });

    const { result } = renderHook(() =>
      useSendMessageToIframe({
        iframeRef: { current: iframe },
        modalUrl: "https://onpe.test/path",
      }),
    );

    result.current.sendMessageToIframe({ type: "PING" });

    expect(postMessage).toHaveBeenCalledWith(
      { type: "PING" },
      "https://onpe.test",
    );
  });

  test("maneja URL inválida sin romper", () => {
    const iframe = document.createElement("iframe");
    Object.defineProperty(iframe, "contentWindow", {
      value: { postMessage: vi.fn() },
      writable: true,
    });

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() =>
      useSendMessageToIframe({
        iframeRef: { current: iframe },
        modalUrl: "not-a-url",
      }),
    );

    result.current.sendMessageToIframe({ type: "PING" });

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
