import React from "react";

import { cn } from "@bem-react/classname";

import { MainLayout } from "../MainLayout";
import { TableItem } from "../TableItem";
import { Pagination } from "../Pagination";

import "./styles.less";

const cx = cn("Table");

export const Table = ({
  displayedTableItems,
  onSort,
  sortedValue,
  sortDirection,
  searching,
  changePage,
  pageCount,
  activePage,
}) => (
  <MainLayout>
    <div className={cx()}>
      <div className={cx("header")}>
        <div className={cx("searching")}>
          <form action="">
            <input
              type="text"
              placeholder="Type name or origin"
              onChange={(e) => searching(e)}
            />
          </form>
        </div>
        <Pagination
          changePage={changePage}
          pageCount={pageCount}
          activePage={activePage}
        />
      </div>
      <table>
        <thead className={cx("title")}>
          <tr>
            <th className={cx("id")} onClick={() => onSort("id")}>
              ID
              {sortedValue === "id" && sortDirection === "straight" && (
                <span>&nbsp;&#129047;</span>
              )}
              {sortedValue === "id" && sortDirection === "reverse" && (
                <span>&nbsp;&#129045;</span>
              )}
            </th>
            <th className={cx("name")} onClick={() => onSort("name")}>
              Name
              {sortedValue === "name" && sortDirection === "straight" && (
                <span>&nbsp;&#129047;</span>
              )}
              {sortedValue === "name" && sortDirection === "reverse" && (
                <span>&nbsp;&#129045;</span>
              )}
            </th>

            <th className={cx("gender")} onClick={() => onSort("gender")}>
              Gender
              {sortedValue === "gender" && sortDirection === "straight" && (
                <span>&nbsp;&#129047;</span>
              )}
              {sortedValue === "gender" && sortDirection === "reverse" && (
                <span>&nbsp;&#129045;</span>
              )}
            </th>

            <th className={cx("origin")} onClick={() => onSort("origin")}>
              Origin
              {sortedValue === "origin" && sortDirection === "straight" && (
                <span>&nbsp;&#129047;</span>
              )}
              {sortedValue === "origin" && sortDirection === "reverse" && (
                <span>&nbsp;&#129045;</span>
              )}
            </th>

            <th
              className={cx("peoples-count")}
              onClick={() => onSort("PeoplesCount")}
            >
              Peoples count
              {sortedValue === "PeoplesCount" &&
                sortDirection === "straight" && <span>&nbsp;&#129047;</span>}
              {sortedValue === "PeoplesCount" &&
                sortDirection === "reverse" && <span>&nbsp;&#129045;</span>}
            </th>
          </tr>
        </thead>
        <tbody className={cx("list")}>
          {displayedTableItems.length === 0 && (
            <tr>
              <td className={cx("no-recordings")} colSpan="5">
                Записей не найдено...
              </td>
            </tr>
          )}
          {displayedTableItems.map((itemContent) => (
            <TableItem key={itemContent.id} itemContent={itemContent} />
          ))}
        </tbody>
      </table>
      <div className={cx("footer")}>
        <Pagination
          changePage={changePage}
          pageCount={pageCount}
          activePage={activePage}
        />
      </div>
    </div>
  </MainLayout>
);
