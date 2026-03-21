import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalDnieVersions } from "./ModalDnieVersions";

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

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  iconDnie1: <img src="" alt="DNIe v1" data-testid="dnie1" />,
  iconDnie2: <img src="" alt="DNIe v2" data-testid="dnie2" />,
};

describe("ModalDnieVersions", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalDnieVersions {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza cuando isOpen es true", () => {
    render(<ModalDnieVersions {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el título 'Versiones del DNIe'", () => {
    render(<ModalDnieVersions {...defaultProps} />);
    expect(screen.getByText("Versiones del DNIe")).toBeInTheDocument();
  });

  test("renderiza iconDnie1", () => {
    render(<ModalDnieVersions {...defaultProps} />);
    expect(screen.getByTestId("dnie1")).toBeInTheDocument();
  });

  test("renderiza iconDnie2", () => {
    render(<ModalDnieVersions {...defaultProps} />);
    expect(screen.getByTestId("dnie2")).toBeInTheDocument();
  });

  test("renderiza iconDnie3 cuando se provee", () => {
    render(
      <ModalDnieVersions
        {...defaultProps}
        iconDnie3={<img src="" alt="" data-testid="dnie3" />}
      />
    );
    expect(screen.getByTestId("dnie3")).toBeInTheDocument();
  });

  test("no renderiza iconDnie3 cuando no se provee", () => {
    render(<ModalDnieVersions {...defaultProps} />);
    expect(screen.queryByTestId("dnie3")).not.toBeInTheDocument();
  });

  test("llama onClose al hacer clic en cerrar", () => {
    const onClose = vi.fn();
    render(<ModalDnieVersions {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
