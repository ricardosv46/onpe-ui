import { describe, test, expect, beforeEach } from "vitest";
import { useModalGlobalStore } from "./useModalGlobalStore";

const defaultPayload = {
  type: "info" as const,
  title: "Título de prueba",
  message: "Mensaje de prueba",
};

describe("useModalGlobalStore", () => {
  beforeEach(() => {
    // Resetear el estado entre tests cerrando cualquier modal abierto
    useModalGlobalStore.getState().closeModal(false);
  });

  describe("estado inicial", () => {
    test("isOpen debe ser false inicialmente", () => {
      expect(useModalGlobalStore.getState().isOpen).toBe(false);
    });

    test("payload debe ser null inicialmente", () => {
      expect(useModalGlobalStore.getState().payload).toBeNull();
    });

    test("isTriState debe ser false inicialmente", () => {
      expect(useModalGlobalStore.getState().isTriState).toBe(false);
    });
  });

  describe("openModal", () => {
    test("abre el modal y establece el payload", () => {
      useModalGlobalStore.getState().openModal(defaultPayload);
      const state = useModalGlobalStore.getState();
      expect(state.isOpen).toBe(true);
      expect(state.payload).toEqual(defaultPayload);
      expect(state.isTriState).toBe(false);
    });

    test("incrementa el modalId en cada apertura", () => {
      const idAntes = useModalGlobalStore.getState().modalId;
      useModalGlobalStore.getState().openModal(defaultPayload);
      expect(useModalGlobalStore.getState().modalId).toBe(idAntes + 1);
    });

    test("retorna una promesa", () => {
      const result = useModalGlobalStore.getState().openModal(defaultPayload);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("openModalWithClose", () => {
    test("abre el modal con isTriState en true", () => {
      useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      expect(useModalGlobalStore.getState().isTriState).toBe(true);
      expect(useModalGlobalStore.getState().isOpen).toBe(true);
    });

    test("retorna una promesa", () => {
      const result = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe("closeModal", () => {
    test("cierra el modal y limpia el payload", () => {
      useModalGlobalStore.getState().openModal(defaultPayload);
      useModalGlobalStore.getState().closeModal(false);
      const state = useModalGlobalStore.getState();
      expect(state.isOpen).toBe(false);
      expect(state.payload).toBeNull();
    });

    test("resuelve la promesa con true cuando confirmed es true", async () => {
      const promise = useModalGlobalStore.getState().openModal(defaultPayload);
      useModalGlobalStore.getState().closeModal(true);
      const result = await promise;
      expect(result).toBe(true);
    });

    test("resuelve la promesa con false cuando confirmed es false", async () => {
      const promise = useModalGlobalStore.getState().openModal(defaultPayload);
      useModalGlobalStore.getState().closeModal(false);
      const result = await promise;
      expect(result).toBe(false);
    });

    test("resuelve la promesa de openModalWithClose con 'confirm' cuando confirmed es true", async () => {
      const promise = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModal(true);
      const result = await promise;
      expect(result).toBe("confirm");
    });

    test("resuelve la promesa de openModalWithClose con 'cancel' cuando confirmed es false", async () => {
      const promise = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModal(false);
      const result = await promise;
      expect(result).toBe("cancel");
    });
  });

  describe("closeModalWithResult", () => {
    test("resuelve con 'confirm' correctamente", async () => {
      const promise = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("confirm");
      expect(await promise).toBe("confirm");
    });

    test("resuelve con 'cancel' correctamente", async () => {
      const promise = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("cancel");
      expect(await promise).toBe("cancel");
    });

    test("resuelve con 'close' correctamente", async () => {
      const promise = useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("close");
      expect(await promise).toBe("close");
    });

    test("resuelve el _resolve con true cuando result es 'confirm'", async () => {
      const promise = useModalGlobalStore.getState().openModal(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("confirm");
      expect(await promise).toBe(true);
    });

    test("resuelve el _resolve con false cuando result es 'cancel'", async () => {
      const promise = useModalGlobalStore.getState().openModal(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("cancel");
      expect(await promise).toBe(false);
    });

    test("cierra el modal y limpia el estado", () => {
      useModalGlobalStore.getState().openModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("close");
      const state = useModalGlobalStore.getState();
      expect(state.isOpen).toBe(false);
      expect(state.payload).toBeNull();
      expect(state.isTriState).toBe(false);
    });
  });
});
