import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BrowserRecommended } from "./BrowserRecommended";

vi.mock("../../icons/Browsers/IconChrome", () => ({ IconChrome: () => <svg data-testid="icon-chrome" /> }));
vi.mock("../../icons/Browsers/IconSafari", () => ({ IconSafari: () => <svg data-testid="icon-safari" /> }));
vi.mock("../../icons/Browsers/IconEdge", () => ({ IconEdge: () => <svg data-testid="icon-edge" /> }));

describe("BrowserRecommended", () => {
  test("renderiza el componente", () => {
    render(<BrowserRecommended />);
    expect(screen.getByText("Navegadores recomendados:")).toBeInTheDocument();
  });

  test("muestra los tres navegadores recomendados por screen reader", () => {
    render(<BrowserRecommended />);
    // Cada navegador aparece en span sr-only y en p aria-hidden — usamos getAllByText
    expect(screen.getAllByText("Google Chrome").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Safari").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Microsoft Edge").length).toBeGreaterThan(0);
  });

  test("renderiza íconos de los tres navegadores", () => {
    render(<BrowserRecommended />);
    expect(screen.getByTestId("icon-chrome")).toBeInTheDocument();
    expect(screen.getByTestId("icon-safari")).toBeInTheDocument();
    expect(screen.getByTestId("icon-edge")).toBeInTheDocument();
  });

  test("renderiza dentro de una lista", () => {
    render(<BrowserRecommended />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
