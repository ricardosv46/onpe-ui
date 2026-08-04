import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalBrowserIncompatible } from "./ModalBrowserIncompatible";

vi.mock("../../Modal/Modal", () => ({
  Modal: ({ isOpen, onClose, children, closeButton }: {
    isOpen: boolean; onClose: () => void; children: React.ReactNode; closeButton?: boolean;
  }) => {
    if (!isOpen) return null;
    return (
      <div role="dialog">
        {closeButton && <button onClick={onClose} aria-label="Cerrar">X</button>}
        {children}
      </div>
    );
  },
}));

vi.mock("../../../icons/Status/IconWarning", () => ({ IconWarning: () => <svg data-testid="icon-warning" /> }));
vi.mock("../../../icons/Browsers/IconChromeColor", () => ({ IconChromeColor: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));
vi.mock("../../../icons/Browsers/IconSafariColor", () => ({ IconSafariColor: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));
vi.mock("../../../icons/Browsers/IconEdgeColor", () => ({ IconEdgeColor: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));

describe("ModalBrowserIncompatible", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalBrowserIncompatible isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza el modal cuando isOpen es true", () => {
    render(<ModalBrowserIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el título del navegador no recomendado", () => {
    render(<ModalBrowserIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByText(/navegador no recomendado/i)).toBeInTheDocument();
  });

  test("muestra los íconos de Chrome, Safari y Edge", () => {
    render(<ModalBrowserIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByLabelText("Google Chrome")).toBeInTheDocument();
    expect(screen.getByLabelText("Safari")).toBeInTheDocument();
    expect(screen.getByLabelText("Microsoft Edge")).toBeInTheDocument();
  });

  test("llama onClose al hacer clic en cerrar", () => {
    const onClose = vi.fn();
    render(<ModalBrowserIncompatible isOpen onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
