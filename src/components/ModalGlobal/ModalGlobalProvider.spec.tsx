import { render, screen, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ModalGlobalProvider } from "./ModalGlobalProvider";
import { useModalGlobalStore } from "../../store/modalGlobal/useModalGlobalStore";
import { useModalLoadingStore } from "../../store/modalGlobal/useModalLoadingStore";
import { useModalLoadingPercentageStore } from "../../store/modalGlobal/useModalLoadingPercentageStore";

vi.mock("../Feedback/ModalConfirm/ModalConfirm", () => ({
  ModalConfirm: ({ isOpen, title }: { isOpen: boolean; title?: string }) =>
    isOpen ? <div data-testid="modal-confirm">{title}</div> : null,
}));

vi.mock("../Feedback/ModalLoading/ModalLoading", () => ({
  ModalLoading: ({ isOpen, message }: { isOpen: boolean; message?: string }) =>
    isOpen ? <div data-testid="modal-loading">{message}</div> : null,
}));

vi.mock("../Feedback/ModalLoadingPercentage/ModalLoadingPercentage", () => ({
  ModalLoadingPercentage: ({ isOpen, message }: { isOpen: boolean; message?: string }) =>
    isOpen ? <div data-testid="modal-percentage">{message}</div> : null,
}));

describe("ModalGlobalProvider", () => {
  beforeEach(() => {
    useModalGlobalStore.getState().closeModal(false);
    useModalLoadingStore.getState().closeLoading();
    useModalLoadingPercentageStore.getState().closeLoadingPercentage();
  });

  test("renderiza los children", () => {
    render(
      <ModalGlobalProvider>
        <div data-testid="hijo">Contenido</div>
      </ModalGlobalProvider>
    );
    expect(screen.getByTestId("hijo")).toBeInTheDocument();
  });

  test("no muestra ModalConfirm cuando el store está cerrado", () => {
    render(<ModalGlobalProvider><div /></ModalGlobalProvider>);
    expect(screen.queryByTestId("modal-confirm")).not.toBeInTheDocument();
  });

  test("muestra ModalConfirm cuando se abre el store", () => {
    render(<ModalGlobalProvider><div /></ModalGlobalProvider>);
    act(() => {
      useModalGlobalStore.getState().openModal({ type: "info", title: "Test modal" });
    });
    expect(screen.getByTestId("modal-confirm")).toBeInTheDocument();
    expect(screen.getByText("Test modal")).toBeInTheDocument();
  });

  test("muestra ModalLoading cuando se abre el loading", () => {
    render(<ModalGlobalProvider><div /></ModalGlobalProvider>);
    act(() => {
      useModalLoadingStore.getState().openLoading("Guardando...");
    });
    expect(screen.getByTestId("modal-loading")).toBeInTheDocument();
    expect(screen.getByText("Guardando...")).toBeInTheDocument();
  });

  test("muestra ModalLoadingPercentage cuando se abre", () => {
    render(<ModalGlobalProvider><div /></ModalGlobalProvider>);
    act(() => {
      useModalLoadingPercentageStore.getState().openLoadingPercentage("Subiendo...");
    });
    expect(screen.getByTestId("modal-percentage")).toBeInTheDocument();
    expect(screen.getByText("Subiendo...")).toBeInTheDocument();
  });

  test("auto-confirma el modal después del timeout", async () => {
    vi.useFakeTimers();
    const promise = useModalGlobalStore
      .getState()
      .openModal({ type: "info", autoConfirmTimeout: 1000 });

    render(<ModalGlobalProvider><div /></ModalGlobalProvider>);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    const result = await promise;
    expect(result).toBe(true);
    expect(useModalGlobalStore.getState().isOpen).toBe(false);
    vi.useRealTimers();
  });
});
