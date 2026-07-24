import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const baseProps = {
    options: mockOptions,
    onChange: vi.fn(),
    value: "",
    name: "test-select",
    placeHolder: "-Seleccionar-",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra placeholder cuando no hay value", () => {
    render(<Select {...baseProps} />);
    expect(screen.getByTestId("select-component-id")).toBeInTheDocument();
    expect(screen.getByText("-Seleccionar-")).toBeInTheDocument();
  });

  test("muestra la etiqueta seleccionada cuando value coincide", () => {
    render(<Select {...baseProps} value="option1" />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("muestra loading cuando loading=true", () => {
    render(<Select {...baseProps} loading />);
    expect(screen.getByTestId("loading-spin")).toBeInTheDocument();
  });

  test("abre opciones y llama onChange al seleccionar", async () => {
    const onChange = vi.fn();
    render(<Select {...baseProps} onChange={onChange} />);

    fireEvent.click(screen.getByTestId("select-component-id"));
    expect(screen.getByTestId("select-options-component-id")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Option 2"));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("option2");
    });
  });

  test("no abre si está disabled", () => {
    render(<Select {...baseProps} disabled />);
    fireEvent.click(screen.getByTestId("select-component-id"));
    expect(screen.queryByTestId("select-options-component-id")).not.toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay opciones", () => {
    render(<Select {...baseProps} options={[]} />);
    fireEvent.click(screen.getByTestId("select-component-id"));
    expect(screen.getByText("No hay opciones disponibles")).toBeInTheDocument();
  });

  test("muestra label sin recortar el botón", () => {
    render(<Select {...baseProps} label="Usuario" />);
    expect(screen.getByText("Usuario")).toBeInTheDocument();
    const button = screen.getByTestId("select-component-id");
    expect(button.className).not.toContain("oui:mt-3");
  });

  test("respeta optionsDisabled", () => {
    const onChange = vi.fn();
    render(
      <Select
        {...baseProps}
        onChange={onChange}
        optionsDisabled={() => new Set(["option2"])}
      />
    );
    fireEvent.click(screen.getByTestId("select-component-id"));
    const option2 = screen.getByText("Option 2");
    expect(option2.closest("button")).toBeDisabled();
    fireEvent.click(option2);
    expect(onChange).not.toHaveBeenCalled();
  });
});
