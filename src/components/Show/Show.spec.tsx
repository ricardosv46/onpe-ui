import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Show } from "./Show";

describe("Show", () => {
  test("muestra loadingComponent cuando condition es true", () => {
    render(
      <Show condition={true} loadingComponent={<div>Cargando...</div>}>
        <div>Contenido principal</div>
      </Show>
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
    expect(screen.queryByText("Contenido principal")).not.toBeInTheDocument();
  });

  test("muestra children cuando condition es false", () => {
    render(
      <Show condition={false} loadingComponent={<div>Cargando...</div>}>
        <div>Contenido principal</div>
      </Show>
    );
    expect(screen.getByText("Contenido principal")).toBeInTheDocument();
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
  });

  test("renderiza JSX complejo como loadingComponent", () => {
    render(
      <Show
        condition={true}
        loadingComponent={
          <div>
            <span data-testid="spinner">⏳</span>
            <p>Por favor espere</p>
          </div>
        }
      >
        <div>Formulario</div>
      </Show>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("Formulario")).not.toBeInTheDocument();
  });

  test("renderiza JSX complejo como children", () => {
    render(
      <Show condition={false} loadingComponent={<span>Cargando</span>}>
        <div>
          <h1>Título</h1>
          <p data-testid="parrafo">Descripción</p>
        </div>
      </Show>
    );
    expect(screen.getByTestId("parrafo")).toBeInTheDocument();
    expect(screen.queryByText("Cargando")).not.toBeInTheDocument();
  });
});
