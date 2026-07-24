import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  test("renderiza spinner inline por defecto", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renderiza spinner full", () => {
    render(<Spinner full />);
    expect(screen.getByTestId("spinner-full")).toBeInTheDocument();
  });
});
