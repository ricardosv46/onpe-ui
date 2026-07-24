import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  test("renderiza pasos y llama onSelectItem", () => {
    const onSelectItem = vi.fn();
    render(<Stepper active={1} total={3} onSelectItem={onSelectItem} />);
    fireEvent.click(screen.getByTestId("page-number-2"));
    expect(onSelectItem).toHaveBeenCalledWith(2);
  });
});
