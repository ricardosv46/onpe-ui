import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  test("renderiza el título correctamente", () => {
    render(<Button color="blue" title="Confirmar" />);
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
  });

  test("aplica la clase de color blue correctamente", () => {
    render(<Button color="blue" title="Test" />);
    expect(screen.getByRole("button").className).toContain("bg-onpe-blue");
  });

  test("aplica la clase de color red correctamente", () => {
    render(<Button color="red" title="Test" />);
    expect(screen.getByRole("button").className).toContain("bg-onpe-red");
  });

  test("aplica tamaño normal por defecto", () => {
    render(<Button color="blue" title="Test" />);
    expect(screen.getByRole("button").className).toContain("min-h-12");
  });

  test("aplica tamaño small correctamente", () => {
    render(<Button color="blue" title="Test" size="small" />);
    expect(screen.getByRole("button").className).toContain("min-h-10");
  });

  test("aplica tamaño large correctamente", () => {
    render(<Button color="blue" title="Test" size="large" />);
    expect(screen.getByRole("button").className).toContain("min-h-14");
  });

  test("llama onClick al hacer clic", () => {
    const onClick = vi.fn();
    render(<Button color="blue" title="Test" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("no llama onClick cuando está deshabilitado", () => {
    const onClick = vi.fn();
    render(<Button color="blue" title="Test" onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  test("aplica className adicional", () => {
    render(<Button color="blue" title="Test" className="mi-clase-extra" />);
    expect(screen.getByRole("button").className).toContain("mi-clase-extra");
  });

  test("color primary usa bg-onpe-blue", () => {
    render(<Button color="primary" title="Test" />);
    expect(screen.getByRole("button").className).toContain("bg-onpe-blue");
  });

  test("pasa atributos HTML nativos al botón", () => {
    render(<Button color="blue" title="Test" type="submit" data-testid="mi-boton" />);
    const button = screen.getByTestId("mi-boton");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("el botón deshabilitado tiene el atributo disabled", () => {
    render(<Button color="blue" title="Test" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("por defecto usa ancho fijo", () => {
    render(<Button color="blue" title="Test" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("w-[200px]");
    expect(button.className).toContain("px-3");
  });

  test("fitContent ajusta el botón al contenido", () => {
    render(<Button color="blue" title="Test" fitContent />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("w-fit");
    expect(button.className).toContain("px-3");
  });
});
