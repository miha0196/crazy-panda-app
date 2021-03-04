import React from "react";

import { cn } from "@bem-react/classname";

import "./styles.less";

const cx = cn("Pagination");

export const Pagination = ({ changePage, pageCount, activePage }) => {
  const pageArr = [1];

  if (pageCount > 0) {
    pageArr.pop();

    if (pageCount > 5) {
      activePage - 2 > 0 && pageArr.push(activePage - 2);
      activePage - 1 > 0 && pageArr.push(activePage - 1);
      pageArr.push(activePage);
      activePage < pageCount && pageArr.push(activePage + 1);
      activePage + 1 < pageCount && pageArr.push(activePage + 2);

      if (activePage + 2 < pageCount) {
        if (activePage + 3 !== pageCount) {
          pageArr.push("...");
        }
        pageArr.push(pageCount);
      }

      if (activePage - 3 > 0) {
        if (activePage - 3 !== 1) {
          pageArr.unshift("...");
        }
        pageArr.unshift(1);
      }
    } else {
      for (let i = 0; i < pageCount; i++) {
        pageArr.push(i + 1);
      }
    }
  }

  return (
    <div className={cx()}>
      <div
        className={cx("prev-page")}
        onClick={() => changePage(-1)}
      >
        &#5176;
      </div>
      {pageArr.map((pageNumber) => (
        <div
          className={`${cx("page")} ${
            activePage === pageNumber ? cx("active-page") : ""
          }`}
          onClick={() => changePage(pageNumber)}
          key={pageNumber}
        >
          {pageNumber}
        </div>
      ))}
      <div
        className={cx("next-page")}
        onClick={() => {
          changePage(-2);
        }}
      >
        &#5171;
      </div>
    </div>
  );
};
