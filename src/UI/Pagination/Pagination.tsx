import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

type PaginationProps = {
  setValue: (i: number) => void;
};

const Pagination: FC<PaginationProps> = ({ setValue }) => {
  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => setValue(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
      />
    </>
  );
};

export default Pagination;
