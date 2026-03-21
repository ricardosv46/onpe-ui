import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalSystemIncompatible } from "./ModalSystemIncompatible";

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

vi.mock("../../../icons/Actions/IconWarning", () => ({ IconWarning: () => <svg data-testid="icon-warning" /> }));
vi.mock("../../../icons/OperatingSystems/IconWindow", () => ({ IconWindow: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));
vi.mock("../../../icons/OperatingSystems/IconAndroid", () => ({ IconAndroid: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));
vi.mock("../../../icons/OperatingSystems/IconApple", () => ({ IconApple: (p: { "aria-label"?: string }) => <svg aria-label={p["aria-label"]} /> }));

describe("ModalSystemIncompatible", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalSystemIncompatible isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza cuando isOpen es true", () => {
    render(<ModalSystemIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el título de sistema no recomendado", () => {
    render(<ModalSystemIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByText(/sistema operativo no recomendado/i)).toBeInTheDocument();
  });

  test("muestra íconos de Windows, Android y Apple", () => {
    render(<ModalSystemIncompatible isOpen onClose={vi.fn()} />);
    expect(screen.getByLabelText(/windows/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/android/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/macos/i)).toBeInTheDocument();
  });

  test("llama onClose al hacer clic en cerrar", () => {
    const onClose = vi.fn();
    render(<ModalSystemIncompatible isOpen onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
