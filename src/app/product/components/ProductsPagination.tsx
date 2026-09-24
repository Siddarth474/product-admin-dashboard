"use client";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  pageSize,
  totalProducts,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) {
  const startItem = totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalProducts);

  const getPageNumbers = () => {
    const pages: number[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-zinc-500">
        Showing{" "}
        <span className="font-medium text-zinc-900">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-medium text-zinc-900">{totalProducts}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm text-zinc-500">
            Rows
          </label>

          <select
            id="page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {pageNumbers.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`hidden h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition sm:block ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
