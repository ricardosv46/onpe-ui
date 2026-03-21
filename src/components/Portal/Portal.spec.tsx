import { render } from "@testing-library/react";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { Portal } from "./Portal";

describe("Portal", () => {
  test("renderiza los children en document.body cuando no hay #portal", () => {
    render(<Portal><div data-testid="portal-content">Contenido</div></Portal>);
    expect(document.body.querySelector("[data-testid='portal-content']")).toBeTruthy();
  });

  test("renderiza los children en el elemento #portal cuando existe", () => {
    const portalEl = document.createElement("div");
    portalEl.id = "portal";
    document.body.appendChild(portalEl);

    render(<Portal><div data-testid="en-portal">Contenido en portal</div></Portal>);

    expect(portalEl.querySelector("[data-testid='en-portal']")).toBeTruthy();
    document.body.removeChild(portalEl);
  });

  test("renderiza los children en un container personalizado", () => {
    const customContainer = document.createElement("div");
    document.body.appendChild(customContainer);

    render(
      <Portal container={customContainer}>
        <div data-testid="custom-container-content">En container custom</div>
      </Portal>
    );

    expect(customContainer.querySelector("[data-testid='custom-container-content']")).toBeTruthy();
    document.body.removeChild(customContainer);
  });

  test("renderiza múltiples children correctamente", () => {
    render(
      <Portal>
        <div data-testid="child-1">Hijo 1</div>
        <div data-testid="child-2">Hijo 2</div>
      </Portal>
    );
    expect(document.body.querySelector("[data-testid='child-1']")).toBeTruthy();
    expect(document.body.querySelector("[data-testid='child-2']")).toBeTruthy();
  });

  test("no renderiza nada si children es undefined", () => {
    const { container } = render(<Portal />);
    // El portal está montado pero sin children visibles en el container del test
    expect(container.innerHTML).toBe("");
  });
});
