import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Input } from "./Input";
import { Radio } from "./Radio";

describe("Input", () => {
  test("muestra error tras focus", () => {
    render(<Input error="Campo requerido" />);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
  });
});

describe("Radio", () => {
  test("asocia label con input", () => {
    render(<Radio label="Sí" name="demo" />);
    expect(screen.getByLabelText("Sí")).toBeInTheDocument();
  });
});
