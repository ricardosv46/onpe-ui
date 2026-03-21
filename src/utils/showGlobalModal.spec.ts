import { describe, test, expect, beforeEach } from "vitest";
import {
  showGlobalModal,
  showGlobalModalWithClose,
  closeGlobalModal,
  isGlobalModalOpen,
  isAlreadyHandled,
  showGlobalLoading,
  closeGlobalLoading,
  isGlobalLoadingOpen,
  showGlobalLoadingPercentage,
  updateGlobalLoadingPercentage,
  closeGlobalLoadingPercentage,
  isGlobalLoadingPercentageOpen,
} from "./showGlobalModal";
import { useModalGlobalStore } from "../store/modalGlobal/useModalGlobalStore";
import { useModalLoadingStore } from "../store/modalGlobal/useModalLoadingStore";
import { useModalLoadingPercentageStore } from "../store/modalGlobal/useModalLoadingPercentageStore";

const defaultPayload = {
  type: "info" as const,
  title: "Prueba",
};

describe("showGlobalModal", () => {
  beforeEach(() => {
    useModalGlobalStore.getState().closeModal(false);
    useModalLoadingStore.getState().closeLoading();
    useModalLoadingPercentageStore.getState().closeLoadingPercentage();
  });

  describe("showGlobalModal", () => {
    test("abre el modal global y retorna una promesa", () => {
      const result = showGlobalModal(defaultPayload);
      expect(result).toBeInstanceOf(Promise);
      expect(isGlobalModalOpen()).toBe(true);
    });

    test("cierra el loading antes de abrir el modal", () => {
      showGlobalLoading("Cargando...");
      expect(isGlobalLoadingOpen()).toBe(true);
      showGlobalModal(defaultPayload);
      expect(isGlobalLoadingOpen()).toBe(false);
    });

    test("cierra el loading de porcentaje antes de abrir el modal", () => {
      showGlobalLoadingPercentage("Subiendo...");
      expect(isGlobalLoadingPercentageOpen()).toBe(true);
      showGlobalModal(defaultPayload);
      expect(isGlobalLoadingPercentageOpen()).toBe(false);
    });

    test("resuelve con true al confirmar", async () => {
      const promise = showGlobalModal(defaultPayload);
      useModalGlobalStore.getState().closeModal(true);
      expect(await promise).toBe(true);
    });

    test("resuelve con false al cancelar", async () => {
      const promise = showGlobalModal(defaultPayload);
      useModalGlobalStore.getState().closeModal(false);
      expect(await promise).toBe(false);
    });
  });

  describe("showGlobalModalWithClose", () => {
    test("abre el modal y retorna una promesa de ModalResult", () => {
      const result = showGlobalModalWithClose(defaultPayload);
      expect(result).toBeInstanceOf(Promise);
      expect(isGlobalModalOpen()).toBe(true);
    });

    test("resuelve con 'confirm', 'cancel' o 'close'", async () => {
      const p1 = showGlobalModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("confirm");
      expect(await p1).toBe("confirm");

      const p2 = showGlobalModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("cancel");
      expect(await p2).toBe("cancel");

      const p3 = showGlobalModalWithClose(defaultPayload);
      useModalGlobalStore.getState().closeModalWithResult("close");
      expect(await p3).toBe("close");
    });
  });

  describe("closeGlobalModal", () => {
    test("cierra el modal global", () => {
      showGlobalModal(defaultPayload);
      closeGlobalModal();
      expect(isGlobalModalOpen()).toBe(false);
    });
  });

  describe("isGlobalModalOpen", () => {
    test("retorna false cuando no hay modal abierto", () => {
      expect(isGlobalModalOpen()).toBe(false);
    });

    test("retorna true cuando hay un modal abierto", () => {
      showGlobalModal(defaultPayload);
      expect(isGlobalModalOpen()).toBe(true);
    });
  });

  describe("isAlreadyHandled", () => {
    test("retorna false cuando no hay modal", () => {
      expect(isAlreadyHandled()).toBe(false);
    });

    test("retorna false cuando el modal no tiene alreadyHandled", () => {
      showGlobalModal(defaultPayload);
      expect(isAlreadyHandled()).toBe(false);
    });

    test("retorna true cuando el modal tiene alreadyHandled: true", () => {
      showGlobalModal({ ...defaultPayload, alreadyHandled: true });
      expect(isAlreadyHandled()).toBe(true);
    });
  });

  describe("showGlobalLoading / closeGlobalLoading", () => {
    test("abre el loading y retorna un sessionId", () => {
      const id = showGlobalLoading();
      expect(typeof id).toBe("number");
      expect(isGlobalLoadingOpen()).toBe(true);
    });

    test("abre con mensaje personalizado", () => {
      showGlobalLoading("Guardando...");
      expect(useModalLoadingStore.getState().message).toBe("Guardando...");
    });

    test("cierra el loading de porcentaje antes de abrir", () => {
      showGlobalLoadingPercentage();
      expect(isGlobalLoadingPercentageOpen()).toBe(true);
      showGlobalLoading();
      expect(isGlobalLoadingPercentageOpen()).toBe(false);
    });

    test("cierra el loading correctamente", () => {
      showGlobalLoading();
      closeGlobalLoading();
      expect(isGlobalLoadingOpen()).toBe(false);
    });

    test("cierra con sessionId correcto", () => {
      const id = showGlobalLoading();
      closeGlobalLoading(id);
      expect(isGlobalLoadingOpen()).toBe(false);
    });

    test("no cierra con sessionId incorrecto", () => {
      const id = showGlobalLoading();
      closeGlobalLoading(id + 99);
      expect(isGlobalLoadingOpen()).toBe(true);
    });
  });

  describe("showGlobalLoadingPercentage / updateGlobalLoadingPercentage / closeGlobalLoadingPercentage", () => {
    test("abre el loading de porcentaje y retorna sessionId", () => {
      const id = showGlobalLoadingPercentage();
      expect(typeof id).toBe("number");
      expect(isGlobalLoadingPercentageOpen()).toBe(true);
    });

    test("cierra el loading simple antes de abrir el de porcentaje", () => {
      showGlobalLoading();
      expect(isGlobalLoadingOpen()).toBe(true);
      showGlobalLoadingPercentage();
      expect(isGlobalLoadingOpen()).toBe(false);
    });

    test("actualiza el porcentaje correctamente", () => {
      showGlobalLoadingPercentage();
      updateGlobalLoadingPercentage(65);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(65);
    });

    test("actualiza con sessionId correcto", () => {
      const id = showGlobalLoadingPercentage();
      updateGlobalLoadingPercentage(80, id);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(80);
    });

    test("ignora actualización con sessionId incorrecto", () => {
      const id = showGlobalLoadingPercentage();
      updateGlobalLoadingPercentage(80, id + 99);
      expect(useModalLoadingPercentageStore.getState().percentage).toBe(0);
    });

    test("cierra el loading de porcentaje", () => {
      showGlobalLoadingPercentage();
      closeGlobalLoadingPercentage();
      expect(isGlobalLoadingPercentageOpen()).toBe(false);
    });

    test("cierra con sessionId correcto", () => {
      const id = showGlobalLoadingPercentage();
      closeGlobalLoadingPercentage(id);
      expect(isGlobalLoadingPercentageOpen()).toBe(false);
    });

    test("no cierra con sessionId incorrecto", () => {
      const id = showGlobalLoadingPercentage();
      closeGlobalLoadingPercentage(id + 99);
      expect(isGlobalLoadingPercentageOpen()).toBe(true);
    });
  });
});
