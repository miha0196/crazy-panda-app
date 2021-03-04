import React from "react";

import { cn } from "@bem-react/classname";

import "./styles.less";

const cx = cn("TableItem");

export const TableItem = ({ itemContent }) => {
  return (
    <tr className={cx()}>
      <td className={cx("id")}>{itemContent.id}</td>
      <td className={cx("name")}>{itemContent.name}</td>
      <td className={cx("gender")}>{itemContent.gender}</td>
      <td className={cx("origin")}>{itemContent.origin}</td>
      <td className={cx("peoples-count")}>{itemContent.PeoplesCount}</td>
    </tr>
  );
};
