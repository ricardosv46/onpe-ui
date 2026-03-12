import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";

import { useModalIframePreload } from "../store/modalIframePreload";
import { useIframePreload } from "./useIframePreload";

describe("useIframePreload", () => {
  afterEach(() => {
    act(() => {
      useModalIframePreload.getState().reset();
    });
  });

  test("handlePreloadIframeReady marca ready y abre modal", () => {
    const { result } = renderHook(() => useIframePreload());

    act(() => {
      result.current.handlePreloadIframeReady();
    });

    const iframeState = useModalIframePreload.getState();
    expect(iframeState.isIframeReady).toBe(true);
    expect(iframeState.isOpenModal).toBe(true);
  });

  test("handleModalIframeReady marca ready solo si aún no estaba listo", () => {
    const { result } = renderHook(() => useIframePreload());

    act(() => {
      result.current.handleModalIframeReady();
    });
    expect(useModalIframePreload.getState().isIframeReady).toBe(true);

    act(() => {
      useModalIframePreload.getState().setIsIframeReady(false);
    });
    act(() => {
      useModalIframePreload.getState().setIsIframeReady(true);
      result.current.handleModalIframeReady();
    });

    expect(useModalIframePreload.getState().isIframeReady).toBe(true);
  });

  test("isPreloading es true cuando hay modalUrl pero el modal no está abierto", () => {
    const { result } = renderHook(() => useIframePreload());

    act(() => {
      useModalIframePreload.getState().setModalUrl("https://onpe.test");
    });

    expect(result.current.isPreloading).toBe(true);
  });

  test("isPreloading es false cuando el modal está abierto", () => {
    const { result } = renderHook(() => useIframePreload());

    act(() => {
      useModalIframePreload.getState().setModalUrl("https://onpe.test");
      useModalIframePreload.getState().openModal();
    });

    expect(result.current.isPreloading).toBe(false);
  });

  test("isPreloading es false cuando no hay modalUrl", () => {
    const { result } = renderHook(() => useIframePreload());
    expect(result.current.isPreloading).toBe(false);
  });
});
