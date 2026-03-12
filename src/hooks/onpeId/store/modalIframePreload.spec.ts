import { describe, test, expect, beforeEach } from "vitest";
import { useModalIframePreload } from "./modalIframePreload";

describe("useModalIframePreload", () => {
  beforeEach(() => {
    useModalIframePreload.getState().reset();
  });

  test("debe tener el estado inicial correcto", () => {
    const state = useModalIframePreload.getState();
    expect(state.modalUrl).toBe("");
    expect(state.isOpenModal).toBe(false);
    expect(state.isIframeReady).toBe(false);
  });

  test("setModalUrl debe actualizar la URL del modal", () => {
    const url = "https://example.com";
    useModalIframePreload.getState().setModalUrl(url);
    expect(useModalIframePreload.getState().modalUrl).toBe(url);
  });

  test("openModal debe establecer isOpenModal en true", () => {
    useModalIframePreload.getState().openModal();
    expect(useModalIframePreload.getState().isOpenModal).toBe(true);
  });

  test("setIsIframeReady debe actualizar el estado de carga", () => {
    useModalIframePreload.getState().setIsIframeReady(true);
    expect(useModalIframePreload.getState().isIframeReady).toBe(true);
  });

  test("closeModal debe resetear isOpenModal, isIframeReady y modalUrl", () => {
    useModalIframePreload.getState().setModalUrl("https://test.com");
    useModalIframePreload.getState().openModal();
    useModalIframePreload.getState().setIsIframeReady(true);

    useModalIframePreload.getState().closeModal();

    const state = useModalIframePreload.getState();
    expect(state.isOpenModal).toBe(false);
    expect(state.isIframeReady).toBe(false);
    expect(state.modalUrl).toBe("");
  });

  test("reset debe restaurar todo el estado inicial", () => {
    useModalIframePreload.getState().setModalUrl("https://test.com");
    useModalIframePreload.getState().openModal();

    useModalIframePreload.getState().reset();

    const state = useModalIframePreload.getState();
    expect(state.modalUrl).toBe("");
    expect(state.isOpenModal).toBe(false);
    expect(state.isIframeReady).toBe(false);
  });
});
