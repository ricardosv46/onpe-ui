import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PaginatorNumbers } from "./PaginatorNumbers";

describe("PaginatorNumbers", () => {
  test("navega a primera página", () => {
    const goToFirstPage = vi.fn();
    render(
      <PaginatorNumbers
        pageIndex={2}
        getPageCount={() => 5}
        getCanPreviousPage={() => true}
        getCanNextPage={() => true}
        previousPage={vi.fn()}
        nextPage={vi.fn()}
        goToFirstPage={goToFirstPage}
        goToLastPage={vi.fn()}
        setPageIndex={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("go-to-first-page"));
    expect(goToFirstPage).toHaveBeenCalled();
  });
});
