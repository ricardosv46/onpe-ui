import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { NotRecommended } from "./NotRecommended";

vi.mock("../../../icons/Actions/IconWarningNotRecommended", () => ({
  IconWarningNotRecommended: () => <svg data-testid="icon-warning" />,
}));
vi.mock("../../../icons/Actions/IconCloseRadius", () => ({
  IconCloseRadius: () => <svg data-testid="icon-close" />,
}));

describe("NotRecommended", () => {
  test("renderiza el componente", () => {
    render(<NotRecommended />);
    expect(screen.getByTestId("icon-warning")).toBeInTheDocument();
  });

  test("muestra el botón cerrar advertencia cuando está expandido", () => {
    render(<NotRecommended />);
    expect(screen.getByRole("button", { name: "Cerrar advertencia" })).toBeInTheDocument();
  });

  test("al cerrar, el botón cerrar desaparece y aparece el botón abrir", () => {
    render(<NotRecommended />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar advertencia" }));
    expect(screen.queryByRole("button", { name: "Cerrar advertencia" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir advertencia" })).toBeInTheDocument();
  });

  test("al abrir, el botón abrir desaparece y aparece el botón cerrar", () => {
    render(<NotRecommended />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar advertencia" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir advertencia" }));
    expect(screen.getByRole("button", { name: "Cerrar advertencia" })).toBeInTheDocument();
  });

  test("muestra mensaje de navegador no recomendado cuando isOpenBrowserError es true", () => {
    render(<NotRecommended isOpenBrowserError={true} />);
    expect(screen.getByText("navegador no recomendado")).toBeInTheDocument();
  });

  test("muestra mensaje de sistema operativo no recomendado cuando isOpenDeviceError es true", () => {
    render(<NotRecommended isOpenDeviceError={true} />);
    expect(screen.getByText("sistema operativo no recomendado")).toBeInTheDocument();
  });

  test("isOpenDeviceError tiene prioridad sobre isOpenBrowserError", () => {
    render(<NotRecommended isOpenBrowserError={true} isOpenDeviceError={true} />);
    expect(screen.getByText("sistema operativo no recomendado")).toBeInTheDocument();
    expect(screen.queryByText("navegador no recomendado")).not.toBeInTheDocument();
  });

  test("aplica bottom y right numéricos como px", () => {
    const { container } = render(<NotRecommended bottom={100} right={50} />);
    const fixed = container.querySelector(".oui\\:fixed");
    expect(fixed).toHaveStyle({ bottom: "100px", right: "50px" });
  });

  test("aplica bottom y right como string directamente", () => {
    const { container } = render(<NotRecommended bottom="2rem" right="1rem" />);
    const fixed = container.querySelector(".oui\\:fixed");
    expect(fixed).toHaveStyle({ bottom: "2rem", right: "1rem" });
  });
});
