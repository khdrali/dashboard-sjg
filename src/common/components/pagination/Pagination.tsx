import React from "react";

interface TablePaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const generatePages = (
  currentPage: number,
  totalPages: number
): (number | "...")[] => {
  const pages: (number | "...")[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1); // Always show first page

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages); // Always show last page

  return pages;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = generatePages(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4 flex-wrap">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TablePagination;
