import { describe, test, expect, beforeEach } from "vitest";
import { useModalLoadingStore } from "./useModalLoadingStore";

describe("useModalLoadingStore", () => {
  beforeEach(() => {
    useModalLoadingStore.getState().closeLoading();
  });

  describe("estado inicial", () => {
    test("isOpen debe ser false", () => {
      expect(useModalLoadingStore.getState().isOpen).toBe(false);
    });

    test("message debe ser 'Cargando...'", () => {
      expect(useModalLoadingStore.getState().message).toBe("Cargando...");
    });

    test("sessionId debe ser 0", () => {
      expect(useModalLoadingStore.getState().sessionId).toBe(0);
    });
  });

  describe("openLoading", () => {
    test("abre el loading con mensaje por defecto", () => {
      useModalLoadingStore.getState().openLoading();
      expect(useModalLoadingStore.getState().isOpen).toBe(true);
      expect(useModalLoadingStore.getState().message).toBe("Cargando...");
    });

    test("abre el loading con mensaje personalizado", () => {
      useModalLoadingStore.getState().openLoading("Guardando datos...");
      expect(useModalLoadingStore.getState().isOpen).toBe(true);
      expect(useModalLoadingStore.getState().message).toBe("Guardando datos...");
    });

    test("incrementa el sessionId en cada apertura", () => {
      const id1 = useModalLoadingStore.getState().openLoading();
      const id2 = useModalLoadingStore.getState().openLoading();
      expect(id2).toBe(id1 + 1);
    });

    test("retorna el sessionId correcto", () => {
      const id = useModalLoadingStore.getState().openLoading();
      expect(id).toBe(useModalLoadingStore.getState().sessionId);
    });
  });

  describe("closeLoading", () => {
    test("cierra el loading sin sessionId", () => {
      useModalLoadingStore.getState().openLoading();
      useModalLoadingStore.getState().closeLoading();
      expect(useModalLoadingStore.getState().isOpen).toBe(false);
    });

    test("resetea el mensaje al cerrar", () => {
      useModalLoadingStore.getState().openLoading("Procesando...");
      useModalLoadingStore.getState().closeLoading();
      expect(useModalLoadingStore.getState().message).toBe("Cargando...");
    });

    test("cierra el loading cuando el sessionId coincide", () => {
      const id = useModalLoadingStore.getState().openLoading();
      useModalLoadingStore.getState().closeLoading(id);
      expect(useModalLoadingStore.getState().isOpen).toBe(false);
    });

    test("no cierra el loading cuando el sessionId no coincide", () => {
      const id = useModalLoadingStore.getState().openLoading();
      useModalLoadingStore.getState().closeLoading(id + 99);
      expect(useModalLoadingStore.getState().isOpen).toBe(true);
    });
  });
});
