import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaginatorNumbers, PaginatorSelectPerPage } from "./PaginatorNumbers";

const meta: Meta<typeof PaginatorNumbers> = {
  title: "Components/PaginatorNumbers",
  component: PaginatorNumbers,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PaginatorNumbers>;

const ControlledPaginator = ({ pageCount = 10 }: { pageCount?: number }) => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div style={{ width: 480 }}>
      <PaginatorNumbers
        pageIndex={pageIndex}
        getPageCount={() => pageCount}
        getCanPreviousPage={() => pageIndex > 0}
        getCanNextPage={() => pageIndex < pageCount - 1}
        previousPage={() => setPageIndex((index) => Math.max(index - 1, 0))}
        nextPage={() => setPageIndex((index) => Math.min(index + 1, pageCount - 1))}
        goToFirstPage={() => setPageIndex(0)}
        goToLastPage={() => setPageIndex(pageCount - 1)}
        setPageIndex={setPageIndex}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ControlledPaginator />,
};

export const FewPages: Story = {
  render: () => <ControlledPaginator pageCount={3} />,
};

export const SinglePage: Story = {
  render: () => <ControlledPaginator pageCount={1} />,
};

const ControlledSelectPerPage = () => {
  const [pageSize, setPageSize] = useState(10);
  return (
    <PaginatorSelectPerPage
      pageSize={pageSize}
      setPageSize={setPageSize}
      options={[10, 25, 50, 100]}
    />
  );
};

export const SelectPerPage: Story = {
  render: () => <ControlledSelectPerPage />,
};
