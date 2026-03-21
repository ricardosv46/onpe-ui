import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalNfc } from "./ModalNfc";

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

vi.mock("../../../icons/OperatingSystems/IconAndroid", () => ({ IconAndroid: () => <svg data-testid="icon-android" /> }));
vi.mock("../../../icons/OperatingSystems/IconApple", () => ({ IconApple: () => <svg data-testid="icon-apple" /> }));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  iconNfc1: <img src="" alt="" data-testid="nfc1" />,
  iconNfc2: <img src="" alt="" data-testid="nfc2" />,
};

describe("ModalNfc", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalNfc {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza cuando isOpen es true", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el título '¿Cómo saber si tu dispositivo móvil tiene NFC?'", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByText(/cómo saber si tu dispositivo móvil tiene NFC/i)).toBeInTheDocument();
  });

  test("muestra la sección '¿Cómo usar el NFC correctamente?'", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByText(/cómo usar el NFC correctamente/i)).toBeInTheDocument();
  });

  test("renderiza iconNfc1 e iconNfc2", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByTestId("nfc1")).toBeInTheDocument();
    expect(screen.getByTestId("nfc2")).toBeInTheDocument();
  });

  test("muestra el link de Android", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByRole("link", { name: /android/i })).toBeInTheDocument();
  });

  test("muestra el link de iPhone", () => {
    render(<ModalNfc {...defaultProps} />);
    expect(screen.getByRole("link", { name: /iphone/i })).toBeInTheDocument();
  });

  test("los links abren en nueva pestaña", () => {
    render(<ModalNfc {...defaultProps} />);
    const links = screen.getAllByRole("link");
    links.forEach(link => expect(link).toHaveAttribute("target", "_blank"));
  });

  test("llama onClose al hacer clic en cerrar", () => {
    const onClose = vi.fn();
    render(<ModalNfc {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
