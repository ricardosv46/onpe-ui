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
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  test("muestra el mensaje", () => {
    render(<ModalLoadingPercentage {...defaultProps} message="Subiendo archivo..." />);
    expect(screen.getByText("Subiendo archivo...")).toBeInTheDocument();
  });

  test("clampea el porcentaje a 100 si supera ese valor", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  test("clampea el porcentaje a 0 si es negativo", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={-10} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  test("el progressbar tiene aria-valuenow correcto", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={40} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "40");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  test("el progressbar tiene el ancho correcto en style", () => {
    render(<ModalLoadingPercentage {...defaultProps} percentage={75} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveStyle({ width: "75%" });
  });

  test("usa renderContent personalizado cuando se provee", () => {
    const renderContent = vi.fn((pct: number, msg: string) => (
      <div data-testid="custom-content">{`${pct} - ${msg}`}</div>
    ));
    render(
      <ModalLoadingPercentage
        {...defaultProps}
        percentage={50}
        message="Procesando"
        renderContent={renderContent}
      />
    );
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    expect(screen.getByText("50 - Procesando")).toBeInTheDocument();
    expect(renderContent).toHaveBeenCalledWith(50, "Procesando");
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
