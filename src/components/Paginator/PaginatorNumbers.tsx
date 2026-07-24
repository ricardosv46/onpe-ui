import {
  IconArrowLeftDoublePaginator,
  IconArrowLeftPaginator,
  IconArrowRightDoublePaginator,
  IconArrowRightPaginator,
} from "../../icons/Actions/IconPaginatorArrows";
import { classNames } from "../../utils/classNames";
import { getVisiblePages } from "../../utils/getVisiblePages";

export interface PaginatorNumbersProps {
  pageIndex: number;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPageIndex: (index: number) => void;
}

const btnClass =
  "oui:p-1 oui:h-[41px] oui:px-3 oui:disabled:bg-onpe-gray-extra-light oui:disabled:text-onpe-black oui:hover:bg-onpe-skyblue oui:hover:text-onpe-white oui:transition-all oui:ease-in-out oui:duration-300 oui:flex oui:justify-center oui:items-center";

export function PaginatorNumbers({
  previousPage,
  getCanPreviousPage,
  setPageIndex,
  pageIndex,
  getPageCount,
  getCanNextPage,
  nextPage,
  goToFirstPage,
  goToLastPage,
}: PaginatorNumbersProps) {
  const pageCount = getPageCount();
  const visiblePages = getVisiblePages(pageCount, pageIndex);

  return (
    <div className="oui:flex oui:justify-between oui:my-5">
      <span className="oui:flex oui:items-center oui:gap-1">
        <div>
          Mostrando {pageIndex + 1} de {pageCount.toLocaleString()}{" "}
          {pageCount.toLocaleString() === "1" ? "página" : "páginas"}
        </div>
      </span>

      <div className="oui:border oui:border-onpe-gray oui:rounded oui:flex">
        <button
          type="button"
          className={btnClass}
          onClick={goToFirstPage}
          data-testid="go-to-first-page"
          disabled={!getCanPreviousPage()}
        >
          <IconArrowLeftDoublePaginator className="oui:w-6 oui:h-6" />
        </button>
        <button
          type="button"
          className={classNames(["oui:border-l oui:border-onpe-gray", btnClass])}
          onClick={previousPage}
          disabled={!getCanPreviousPage()}
        >
          <IconArrowLeftPaginator className="oui:w-6 oui:h-6" />
        </button>
        {visiblePages.map((row) => (
          <button
            type="button"
            key={`${row}-${pageIndex}`}
            onClick={() => setPageIndex(row)}
            className={classNames([
              "oui:border-l oui:border-onpe-gray oui:disabled:bg-onpe-gray-extra-light oui:disabled:text-onpe-black oui:p-1 oui:w-[41px] oui:h-[41px] oui:hover:bg-onpe-skyblue oui:hover:text-onpe-white oui:transition-all oui:ease-in-out oui:duration-300",
              pageIndex === row ? "oui:bg-onpe-skyblue oui:text-onpe-white" : "",
            ])}
          >
            {row + 1}
          </button>
        ))}
        <button
          type="button"
          className={classNames(["oui:border-l oui:border-onpe-gray", btnClass])}
          onClick={nextPage}
          disabled={!getCanNextPage()}
        >
          <IconArrowRightPaginator className="oui:w-6 oui:h-6" />
        </button>
        <button
          type="button"
          className={classNames(["oui:border-l oui:border-onpe-gray", btnClass])}
          onClick={goToLastPage}
          data-testid="go-to-last-page"
          disabled={!getCanNextPage()}
        >
          <IconArrowRightDoublePaginator className="oui:w-6 oui:h-6" />
        </button>
      </div>
    </div>
  );
}

export interface PaginatorSelectPerPageProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  options: number[];
}

export function PaginatorSelectPerPage({
  pageSize,
  setPageSize,
  options,
}: PaginatorSelectPerPageProps) {
  return (
    <div className="oui:flex oui:items-center oui:gap-3">
      <p>Mostrar</p>
      <select
        className="oui:border oui:h-[43px] oui:w-[77px] oui:px-3"
        value={pageSize}
        onChange={(event_) => setPageSize(Number(event_.target.value))}
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <p>registros</p>
    </div>
  );
}
