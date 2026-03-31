import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalLoadingPercentage } from "./ModalLoadingPercentage";

vi.mock("../../Modal/Modal", () => ({
  Modal: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return <div role="dialog">{children}</div>;
  },
}));

const defaultProps = {
  isOpen: true,
  message: "Cargando...",
  percentage: 0,
};

describe("ModalLoadingPercentage", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalLoadingPercentage {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza cuando isOpen es true", () => {
    render(<ModalLoadingPercentage {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el porcentaje correcto", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={65} />);
    expect(screen.getByText(/65\s*%/)).toBeInTheDocument();
  });

  test("muestra el mensaje", () => {
    render(<ModalLoadingPercentage {...defaultProps} message="Subiendo archivo..." />);
    expect(screen.getByText(/Subiendo archivo\.\.\./)).toBeInTheDocument();
  });

  test("clampea el porcentaje a 100 si supera ese valor", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={150} />);
    expect(screen.getByText(/100\s*%/)).toBeInTheDocument();
  });

  test("clampea el porcentaje a 0 si es negativo", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={-10} />);
    expect(screen.getByText(/0\s*%/)).toBeInTheDocument();
  });

  test("la barra tiene el ancho correcto en style", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={40} />);
    const bar = document.querySelector('[style*="width: 40%"]');
    expect(bar).toBeInTheDocument();
  });

  test("la barra refleja porcentaje clampeado", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={75} />);
    const bar = document.querySelector('[style*="width: 75%"]');
    expect(bar).toBeInTheDocument();
  });
});
