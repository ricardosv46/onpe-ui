import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

import { useSocketConnection } from "./useSocketConnection";

const mockSocketOn = vi.fn();
const mockSocketEmit = vi.fn();
const mockSocketDisconnect = vi.fn();
const mockSocketRemoveAllListeners = vi.fn();
const mockSocketIoOn = vi.fn();

const createMockSocket = () => ({
  on: mockSocketOn,
  emit: mockSocketEmit,
  disconnect: mockSocketDisconnect,
  removeAllListeners: mockSocketRemoveAllListeners,
  io: {
    on: mockSocketIoOn,
  },
});

let mockSocket = createMockSocket();

vi.mock("socket.io-client", () => ({
  default: vi.fn(() => mockSocket),
}));

describe("useSocketConnection", () => {
  const mockCloseLaunchApp = vi.fn();
  const mockCloseModal = vi.fn();
  const mockOnComplete = vi.fn();
  const mockOnDisconnectClient = vi.fn();
  const mockOnDisconnect = vi.fn();
  const mockOnMaxReconnects = vi.fn();
  const mockOnConnectionChange = vi.fn();

  const defaultProps = {
    socketUrl: "wss://localhost:9004",
    secure: false,
    isOpenLaunchApp: true,
    dataOpenLaunchApp: { token: "test-token" },
    closeLaunchApp: mockCloseLaunchApp,
    closeModal: mockCloseModal,
    onComplete: mockOnComplete,
    onDisconnectClient: mockOnDisconnectClient,
    onDisconnect: mockOnDisconnect,
    onMaxReconnects: mockOnMaxReconnects,
    onConnectionChange: mockOnConnectionChange,
    enabled: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockSocket = createMockSocket();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("inicialización", () => {
    test("retorna attempts inicializado en 0", () => {
      const { result } = renderHook(() => useSocketConnection(defaultProps));
      expect(result.current.attempts).toBe(0);
    });

    test("crea socket con la socketUrl y secure correctos", async () => {
      const io = await import("socket.io-client");
      renderHook(() => useSocketConnection(defaultProps));

      expect(io.default).toHaveBeenCalledWith("wss://localhost:9004", {
        transports: ["websocket"],
        secure: false,
        upgrade: false,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: 14,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 1000,
      });
    });

    test("registra todos los listeners del socket", () => {
      renderHook(() => useSocketConnection(defaultProps));

      expect(mockSocketOn).toHaveBeenCalledWith("connect", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("disconnect", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("onProcessComplete", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("onValidationComplete", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("onProcessCompleteFirma", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("onServerTimeout", expect.any(Function));
      expect(mockSocketOn).toHaveBeenCalledWith("onDisconnectClient", expect.any(Function));
      expect(mockSocketIoOn).toHaveBeenCalledWith("reconnect_attempt", expect.any(Function));
    });
  });

  describe("condiciones para no crear socket", () => {
    test("no crea socket cuando enabled es false", async () => {
      const io = await import("socket.io-client");
      vi.mocked(io.default).mockClear();
      renderHook(() => useSocketConnection({ ...defaultProps, enabled: false }));
      expect(io.default).not.toHaveBeenCalled();
    });

    test("no crea socket cuando isOpenLaunchApp es false", async () => {
      const io = await import("socket.io-client");
      vi.mocked(io.default).mockClear();
      renderHook(() => useSocketConnection({ ...defaultProps, isOpenLaunchApp: false }));
      expect(io.default).not.toHaveBeenCalled();
    });
  });

  describe("handleConnect", () => {
    test("llama onConnectionChange(true) y emite setToken al conectar con datos válidos", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const connectHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "connect",
      )?.[1];
      act(() => {
        connectHandler?.();
      });
      expect(mockOnConnectionChange).toHaveBeenCalledWith(true);
      expect(mockSocketEmit).toHaveBeenCalledWith("setToken", { token: "test-token" });
    });
  });

  describe("handleDisconnect", () => {
    test("llama funciones de limpieza y onDisconnect", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const disconnectHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "disconnect",
      )?.[1];
      act(() => {
        disconnectHandler?.();
      });
      expect(mockOnConnectionChange).toHaveBeenCalledWith(false);
      expect(mockCloseLaunchApp).toHaveBeenCalled();
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockOnDisconnect).toHaveBeenCalled();
    });
  });

  describe("handleReconnectAttempt", () => {
    test("actualiza attempts en cada intento de reconexión", async () => {
      const { result } = renderHook(() => useSocketConnection(defaultProps));
      const reconnectHandler = mockSocketIoOn.mock.calls.find(
        (call) => call[0] === "reconnect_attempt",
      )?.[1];
      act(() => {
        reconnectHandler?.(5);
      });
      await waitFor(() => {
        expect(result.current.attempts).toBe(5);
      });
    });
  });

  describe("handleComplete", () => {
    test("llama onComplete en onProcessComplete", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const completeHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "onProcessComplete",
      )?.[1];
      act(() => {
        completeHandler?.({ success: true, token: "response-token" });
      });
      expect(mockCloseLaunchApp).toHaveBeenCalled();
      expect(mockOnConnectionChange).toHaveBeenCalledWith(false);
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockOnComplete).toHaveBeenCalledWith({ success: true, token: "response-token" });
    });

    test("llama onComplete en onValidationComplete", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const validationHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "onValidationComplete",
      )?.[1];
      act(() => {
        validationHandler?.({ success: true, token: "validation-token" });
      });
      expect(mockOnComplete).toHaveBeenCalledWith({ success: true, token: "validation-token" });
    });
  });

  describe("handleServerTimeout", () => {
    test("limpia estado en onServerTimeout", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const timeoutHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "onServerTimeout",
      )?.[1];
      act(() => {
        timeoutHandler?.();
      });
      expect(mockCloseLaunchApp).toHaveBeenCalled();
      expect(mockOnConnectionChange).toHaveBeenCalledWith(false);
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  describe("handleDisconnectClient", () => {
    test("llama funciones de limpieza y onDisconnectClient", () => {
      renderHook(() => useSocketConnection(defaultProps));
      const disconnectClientHandler = mockSocketOn.mock.calls.find(
        (call) => call[0] === "onDisconnectClient",
      )?.[1];
      act(() => {
        disconnectClientHandler?.();
      });
      expect(mockCloseLaunchApp).toHaveBeenCalled();
      expect(mockOnConnectionChange).toHaveBeenCalledWith(false);
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockOnDisconnectClient).toHaveBeenCalled();
    });
  });

  describe("máximo de intentos de reconexión", () => {
    test("limpia estado y llama a onMaxReconnects", async () => {
      renderHook(() => useSocketConnection(defaultProps));
      const reconnectHandler = mockSocketIoOn.mock.calls.find(
        (call) => call[0] === "reconnect_attempt",
      )?.[1];
      act(() => {
        reconnectHandler?.(14);
      });
      await waitFor(() => {
        expect(mockCloseLaunchApp).toHaveBeenCalled();
      });
      expect(mockOnConnectionChange).toHaveBeenCalledWith(false);
      expect(mockCloseModal).toHaveBeenCalled();
      expect(mockOnMaxReconnects).toHaveBeenCalled();
    });
  });

  describe("cleanup", () => {
    test("limpia socket al desmontar", () => {
      const { unmount } = renderHook(() => useSocketConnection(defaultProps));
      unmount();
      expect(mockSocketRemoveAllListeners).toHaveBeenCalled();
      expect(mockSocketDisconnect).toHaveBeenCalled();
    });

    test("limpia socket cuando enabled cambia a false", () => {
      let enabled = true;
      const { rerender } = renderHook(() =>
        useSocketConnection({ ...defaultProps, enabled }),
      );
      mockSocketRemoveAllListeners.mockClear();
      mockSocketDisconnect.mockClear();
      enabled = false;
      rerender();
      expect(mockSocketRemoveAllListeners).toHaveBeenCalled();
      expect(mockSocketDisconnect).toHaveBeenCalled();
    });
  });
});
