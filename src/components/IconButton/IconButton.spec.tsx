import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  test("expone un nombre accesible vía aria-label", () => {
    render(<IconButton icon={<svg data-testid="icon" />} label="Buscar" />);
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  test("dispara onClick", () => {
    const onClick = vi.fn();
    render(<IconButton icon={<svg />} label="Eliminar" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("no dispara onClick cuando está disabled", () => {
    const onClick = vi.fn();
    render(<IconButton icon={<svg />} label="Eliminar" onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
