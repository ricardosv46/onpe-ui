import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";

import {
  useIframeCommunication,
  useIframePreload,
  useSocketConnection,
} from "../onpeId";
import { useOnpeIdAuth } from "./useOnpeIdAuth";

vi.mock("../onpeId", () => ({
  useIframeCommunication: vi.fn(),
  useIframePreload: vi.fn(),
  useSocketConnection: vi.fn(),
}));

const mockUseIframePreload = {
  modalUrl: "",
  setModalUrl: vi.fn(),
  isOpenModal: false,
  isPreloading: false,
  closeModal: vi.fn(),
  preloadIframeRef: { current: null },
  iframeRef: { current: null },
  handlePreloadIframeReady: vi.fn(),
  handleModalIframeReady: vi.fn(),
  reset: vi.fn(),
};

const mockUseSocketConnection = { attempts: 0 };

const defaultParams = {
  socketUrl: "wss://localhost:9004",
  secure: false,
  navigate: vi.fn(),
  onConnectionChange: vi.fn(),
};

describe("useOnpeIdAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useIframePreload as ReturnType<typeof vi.fn>).mockReturnValue(mockUseIframePreload);
    (useSocketConnection as ReturnType<typeof vi.fn>).mockReturnValue(mockUseSocketConnection);
    (useIframeCommunication as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

    Object.defineProperty(globalThis, "location", {
      value: { assign: vi.fn() },
      writable: true,
    });
  });

  test("inicializa con los estados correctos", () => {
    const { result } = renderHook(() => useOnpeIdAuth(defaultParams));

    expect(result.current.modalUrl).toBe("");
    expect(result.current.isOpenModal).toBe(false);
    expect(result.current.isOpenLaunchApp).toBe(false);
    expect(result.current.attempts).toBe(0);
  });

  test("handleClose llama onConnectionChange(false), closeModal y reset", () => {
    const onConnectionChange = vi.fn();
    const { result } = renderHook(() =>
      useOnpeIdAuth({ ...defaultParams, onConnectionChange }),
    );

    act(() => {
      result.current.handleClose();
    });

    expect(onConnectionChange).toHaveBeenCalledWith(false);
    expect(mockUseIframePreload.closeModal).toHaveBeenCalled();
    expect(mockUseIframePreload.reset).toHaveBeenCalled();
  });

  test("configura useSocketConnection con socketUrl y secure correctos", () => {
    const onComplete = vi.fn();

    renderHook(() =>
      useOnpeIdAuth({ ...defaultParams, socketUrl: "wss://test.com", secure: true, onComplete }),
    );

    expect(useSocketConnection).toHaveBeenCalledWith(
      expect.objectContaining({
        socketUrl: "wss://test.com",
        secure: true,
        onComplete,
      }),
    );
  });

  test("onPageReload se llama en mount si connectionApp es true", () => {
    const onPageReload = vi.fn();
    const onConnectionChange = vi.fn();

    renderHook(() =>
      useOnpeIdAuth({
        ...defaultParams,
        onConnectionChange,
        connectionApp: true,
        onPageReload,
      }),
    );

    expect(onConnectionChange).toHaveBeenCalledWith(false);
    expect(onPageReload).toHaveBeenCalled();
  });

  test("onPageReload no se llama si connectionApp es false", () => {
    const onPageReload = vi.fn();

    renderHook(() =>
      useOnpeIdAuth({ ...defaultParams, connectionApp: false, onPageReload }),
    );

    expect(onPageReload).not.toHaveBeenCalled();
  });

  test("onOpenApp navega a la URL recibida", () => {
    const navigate = vi.fn();
    let iframeCommArgs: { onOpenApp?: (data: { url: string }) => void } = {};

    (useIframeCommunication as ReturnType<typeof vi.fn>).mockImplementation(
      (args: typeof iframeCommArgs) => { iframeCommArgs = args; },
    );

    renderHook(() => useOnpeIdAuth({ ...defaultParams, navigate }));

    act(() => {
      iframeCommArgs.onOpenApp?.({ url: "https://example.com" });
    });

    expect(navigate).toHaveBeenCalledWith("https://example.com");
  });

  test("onExpiredApp cierra modal y llama callback", () => {
    const onExpiredApp = vi.fn();
    const onConnectionChange = vi.fn();
    let iframeCommArgs: { onExpiredApp?: () => void } = {};

    (useIframeCommunication as ReturnType<typeof vi.fn>).mockImplementation(
      (args: typeof iframeCommArgs) => { iframeCommArgs = args; },
    );

    renderHook(() =>
      useOnpeIdAuth({ ...defaultParams, onConnectionChange, onExpiredApp }),
    );

    act(() => {
      iframeCommArgs.onExpiredApp?.();
    });

    expect(mockUseIframePreload.closeModal).toHaveBeenCalled();
    expect(onExpiredApp).toHaveBeenCalled();
  });

  test("onHomeApp cierra modal y llama callback", () => {
    const onHomeApp = vi.fn();
    let iframeCommArgs: { onHomeApp?: () => void } = {};

    (useIframeCommunication as ReturnType<typeof vi.fn>).mockImplementation(
      (args: typeof iframeCommArgs) => { iframeCommArgs = args; },
    );

    renderHook(() => useOnpeIdAuth({ ...defaultParams, onHomeApp }));

    act(() => {
      iframeCommArgs.onHomeApp?.();
    });

    expect(mockUseIframePreload.closeModal).toHaveBeenCalled();
    expect(onHomeApp).toHaveBeenCalled();
  });

  test("onNotApp cierra modal y llama callback", () => {
    const onNotApp = vi.fn();
    let iframeCommArgs: { onNotApp?: () => void } = {};

    (useIframeCommunication as ReturnType<typeof vi.fn>).mockImplementation(
      (args: typeof iframeCommArgs) => { iframeCommArgs = args; },
    );

    renderHook(() => useOnpeIdAuth({ ...defaultParams, onNotApp }));

    act(() => {
      iframeCommArgs.onNotApp?.();
    });

    expect(mockUseIframePreload.closeModal).toHaveBeenCalled();
    expect(onNotApp).toHaveBeenCalled();
  });

  test("onLaunchApp abre el launch app state", () => {
    let iframeCommArgs: { onLaunchApp?: (data: { data: unknown }) => void } = {};

    (useIframeCommunication as ReturnType<typeof vi.fn>).mockImplementation(
      (args: typeof iframeCommArgs) => { iframeCommArgs = args; },
    );

    const { result } = renderHook(() => useOnpeIdAuth(defaultParams));

    expect(result.current.isOpenLaunchApp).toBe(false);

    act(() => {
      iframeCommArgs.onLaunchApp?.({ data: { userId: 123 } });
    });

    expect(result.current.isOpenLaunchApp).toBe(true);
  });
});
