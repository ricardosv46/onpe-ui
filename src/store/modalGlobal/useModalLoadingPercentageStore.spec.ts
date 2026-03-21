import { describe, test, expect, beforeEach } from "vitest";
import { useModalLoadingPercentageStore } from "./useModalLoadingPercentageStore";

describe("useModalLoadingPercentageStore", () => {
  beforeEach(() => {
    useModalLoadingPercentageStore.getState().closeLoadingPercentage();
  });

  describe("estado inicial", () => {
    test("isOpen debe ser false", () => {
      expect(useModalLoadingPercentageStore.getState().isOpen).toBe(false);
    });

    test("message debe ser 'Cargando...'", () => {
      expect(useModalLoadingPercentageStore.getState().message).toBe("Cargando...");
    });

    test("percentage debe ser 0", () => {
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(0);
    });

    test("sessionId debe ser 0", () => {
      expect(useModalLoadingPercentageStore.getState().sessionId).toBe(0);
    });
  });

  describe("openLoadingPercentage", () => {
    test("abre con valores por defecto", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage();
      const state = useModalLoadingPercentageStore.getState();
      expect(state.isOpen).toBe(true);
      expect(state.message).toBe("Cargando...");
      expect(state.percentage).toBe(0);
    });

    test("abre con mensaje personalizado", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Subiendo archivo...");
      expect(useModalLoadingPercentageStore.getState().message).toBe("Subiendo archivo...");
    });

    test("abre con porcentaje inicial", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Cargando", 30);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(30);
    });

    test("limita el porcentaje inicial a 100", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Test", 150);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(100);
    });

    test("limita el porcentaje inicial a 0 (no negativo)", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Test", -20);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(0);
    });

    test("incrementa el sessionId en cada apertura", () => {
      const id1 = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      const id2 = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      expect(id2).toBe(id1 + 1);
    });

    test("retorna el sessionId correcto", () => {
      const id = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      expect(id).toBe(useModalLoadingPercentageStore.getState().sessionId);
    });
  });

  describe("updatePercentage", () => {
    test("actualiza el porcentaje correctamente", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().updatePercentage(50);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(50);
    });

    test("limita el porcentaje a 100", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().updatePercentage(200);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(100);
    });

    test("limita el porcentaje a 0 (no negativo)", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().updatePercentage(-10);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(0);
    });

    test("actualiza cuando el sessionId coincide", () => {
      const id = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().updatePercentage(75, id);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(75);
    });

    test("ignora la actualización cuando el sessionId no coincide", () => {
      const id = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().updatePercentage(75, id + 99);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(0);
    });
  });

  describe("closeLoadingPercentage", () => {
    test("cierra el loading sin sessionId", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().closeLoadingPercentage();
      expect(useModalLoadingPercentageStore.getState().isOpen).toBe(false);
    });

    test("resetea el mensaje y porcentaje al cerrar", () => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Subiendo...", 60);
      useModalLoadingPercentageStore.getState().closeLoadingPercentage();
      const state = useModalLoadingPercentageStore.getState();
      expect(state.message).toBe("Cargando...");
      expect(state.percentage).toBe(0);
    });

    test("cierra cuando el sessionId coincide", () => {
      const id = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().closeLoadingPercentage(id);
      expect(useModalLoadingPercentageStore.getState().isOpen).toBe(false);
    });

    test("no cierra cuando el sessionId no coincide", () => {
      const id = useModalLoadingPercentageStore.getState().openLoadingPercentage();
      useModalLoadingPercentageStore.getState().closeLoadingPercentage(id + 99);
      expect(useModalLoadingPercentageStore.getState().isOpen).toBe(true);
    });
  });
});
