import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TabsUnderline } from "./TabsUnderline";

const tabs = [
  { key: "logos", label: "Logos de Organización Política" },
  { key: "fotos", label: "Fotos de Candidatos" },
];

describe("TabsUnderline", () => {
  test("marca como seleccionado el tab activo", () => {
    render(<TabsUnderline tabs={tabs} activeKey="logos" onChange={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Logos de Organización Política" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "Fotos de Candidatos" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  test("dispara onChange con la key del tab clickeado", () => {
    const onChange = vi.fn();
    render(<TabsUnderline tabs={tabs} activeKey="logos" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Fotos de Candidatos" }));
    expect(onChange).toHaveBeenCalledWith("fotos");
  });
});
