import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { LinkButton } from "./LinkButton";

describe("LinkButton", () => {
  test("muestra el título", () => {
    render(<LinkButton title="Limpiar filtros" />);
    expect(screen.getByRole("button", { name: "Limpiar filtros" })).toBeInTheDocument();
  });

  test("dispara onClick", () => {
    const onClick = vi.fn();
    render(<LinkButton title="Limpiar filtros" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Limpiar filtros" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
