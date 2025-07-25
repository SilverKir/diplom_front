import { useState } from "react";
import classes from "./pagination.module.css";

type PaginationProps = {
  totalPages: number;
  onClick: (page: number) => Promise<void>;
};

export const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    props.onClick(pageNumber - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(
        <button
          className={classes["pagination-button"]}
          key={i}
          onClick={(e) => {
            e.preventDefault();
            handleClick(i);
          }}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={classes["pagination-wrap"]}>{renderPageNumbers()}</div>
  );
};
