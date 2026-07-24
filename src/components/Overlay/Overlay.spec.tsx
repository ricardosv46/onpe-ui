import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Overlay } from "./Overlay";

describe("Overlay", () => {
  test("renderiza un div en el DOM", () => {
    const { container } = render(<Overlay />);
    expect(container.firstChild).toBeTruthy();
  });

  test("tiene opacity-100 cuando show es true", () => {
    const { container } = render(<Overlay show={true} />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:opacity-100");
  });

  test("tiene opacity-0 cuando show es false", () => {
    const { container } = render(<Overlay show={false} />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:opacity-0");
  });

  test("tiene pointer-events-auto cuando show es true", () => {
    const { container } = render(<Overlay show={true} />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:pointer-events-auto");
  });

  test("tiene pointer-events-none cuando show es false", () => {
    const { container } = render(<Overlay show={false} />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:pointer-events-none");
  });

  test("llama onClick al hacer clic", () => {
    const onClick = vi.fn();
    const { container } = render(<Overlay show={true} onClick={onClick} />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("aplica la clase de color blue por defecto", () => {
    const { container } = render(<Overlay />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:bg-onpe-blue");
  });

  test("aplica la clase de color red cuando se especifica", () => {
    const { container } = render(<Overlay color="red" />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:bg-onpe-red");
  });

  test("aplica la clase de color gray cuando se especifica", () => {
    const { container } = render(<Overlay color="gray" />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:bg-onpe-gray");
  });

  test("color primary usa la clase bg-onpe-blue", () => {
    const { container } = render(<Overlay color="primary" />);
    expect((container.firstChild as HTMLElement).className).toContain("oui:bg-onpe-blue");
  });
});
