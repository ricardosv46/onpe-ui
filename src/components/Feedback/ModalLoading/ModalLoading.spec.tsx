import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ModalLoading } from "./ModalLoading";

vi.mock("../../Modal/Modal", () => ({
  Modal: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return <div role="dialog">{children}</div>;
  },
}));

vi.mock("../../../icons/Loading/IconSpinnerDesktop", () => ({
  IconSpinnerDesktop: () => <svg data-testid="spinner-desktop" />,
}));
vi.mock("../../../icons/Loading/IconSpinnerMobile", () => ({
  IconSpinnerMobile: () => <svg data-testid="spinner-mobile" />,
}));

describe("ModalLoading", () => {
  test("no renderiza cuando isOpen es false", () => {
    render(<ModalLoading isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renderiza cuando isOpen es true", () => {
    render(<ModalLoading isOpen={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("muestra el mensaje por defecto", () => {
    render(<ModalLoading isOpen={true} />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("muestra un mensaje personalizado", () => {
    render(<ModalLoading isOpen={true} message="Procesando pago..." />);
    expect(screen.getByText("Procesando pago...")).toBeInTheDocument();
  });

  test("muestra el spinner por defecto", () => {
    render(<ModalLoading isOpen={true} />);
    expect(screen.getByTestId("spinner-desktop")).toBeInTheDocument();
  });

  test("muestra spinner personalizado en lugar del por defecto", () => {
    render(
      <ModalLoading
        isOpen={true}
        spinner={<div data-testid="custom-spinner">⏳</div>}
      />
    );
    expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("spinner-desktop")).not.toBeInTheDocument();
  });

  test("tiene región aria-live para accesibilidad", () => {
    render(<ModalLoading isOpen={true} />);
    const liveRegion = document.querySelector("[aria-live='assertive']");
    expect(liveRegion).toBeInTheDocument();
  });
});
