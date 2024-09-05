import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/paginationSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.pagination);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 my-5">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 text-sm sm:text-base"
      >
        Previous
      </button>
      {totalPages ? (
        Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 sm:px-3 sm:py-2 rounded ${
              currentPage === index + 1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-gray-300 text-xs sm:text-sm`}
          >
            {index + 1}
          </button>
        ))
      ) : (
        <button className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-200 text-gray-700 rounded text-xs sm:text-sm">
          1
        </button>
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 text-sm sm:text-base"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
