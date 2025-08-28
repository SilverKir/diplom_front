import { Dispatch, SetStateAction } from "react";
import { ROWS_PER_PAGE } from "../../constants";
import classes from "./pagination.module.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  dataLength: number;
  morePage: boolean;
  onClick: (page: number) => Promise<void>;
  setPage: Dispatch<SetStateAction<number>>;
  setMoreРage: Dispatch<SetStateAction<boolean>>;
};

export const Pagination = (props: PaginationProps) => {
  const handleClick = (pageNumber: number) => {
    if (props.dataLength === ROWS_PER_PAGE && props.morePage) {
      props.setPage(pageNumber + 1);
    } else if (props.dataLength < ROWS_PER_PAGE) {
      props.setMoreРage(false);
    }
    props.onClick(pageNumber - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let pageCount = props.totalPages;
    if (props.dataLength < ROWS_PER_PAGE) {
      --pageCount;
    }
    if (props.dataLength === ROWS_PER_PAGE && !props.morePage) {
      --pageCount;
    }

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <button
          className={classes["pagination-button"]}
          key={i}
          onClick={(e) => {
            e.preventDefault();
            handleClick(i);
          }}
          disabled={props.currentPage + 1 === i}
        >
          {i}
        </button>
      );
    }
    pageNumbers.push(
      <div className={classes["pagination-dotes"]} key="dotes">
        {props.morePage && "..."}
      </div>
    );
    return pageNumbers;
  };

  return (
    <div className={classes["pagination-wrap"]}>{renderPageNumbers()}</div>
  );
};
