import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

// Carga todos los iconos de todas las subcarpetas (excluye stories y specs)
const modules = import.meta.glob("./**/*.tsx", { eager: true });

type IconEntry = [string, unknown];
const icons: IconEntry[] = [];

for (const [path, module_] of Object.entries(modules)) {
  if (path.includes(".spec.") || path.includes(".stories.")) continue;

  const m = module_ as Record<string, unknown>;

  if (typeof m.default === "function") {
    const name = (m.default as { name?: string }).name || path;
    icons.push([name, m.default]);
  }

  for (const [exportName, exp] of Object.entries(m)) {
    if (exportName === "default") continue;
    if (typeof exp === "function") {
      icons.push([exportName, exp]);
    }
  }
}

// Evitar duplicados (default y named export apuntando al mismo componente)
const seen = new Set<unknown>();
const uniqueIcons = icons.filter(([_, Comp]) => {
  if (seen.has(Comp)) return false;
  seen.add(Comp);
  return true;
});

describe("Icons smoke", () => {
  test.each(uniqueIcons)(
    "renders %s sin errores y contiene un <svg>",
    (_name, IconComp) => {
      const Comp = IconComp as React.ComponentType;
      const { container } = render(<Comp />);
      expect(container.querySelector("svg")).not.toBeNull();
    }
  );
});
