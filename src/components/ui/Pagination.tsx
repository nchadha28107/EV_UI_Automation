import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (val: number) => void;
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const buttonClasses =
    "bg-indigo-500 font-semibold text-white py-2 px-4 hover:bg-indigo-600 disabled:bg-gray-300";

  const FIRST_PAGE = 1;

  return (
    <div className="flex justify-center gap-1 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === FIRST_PAGE}
        className={`${buttonClasses} rounded-l`}
      >
        Previous
      </button>
      <p className="bg-white text-indigo-500 py-2 px-4 font-semibold border-2 border-indigo-500">
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonClasses} rounded-r`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
