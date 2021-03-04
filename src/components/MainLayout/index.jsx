import React from "react";

import { cn } from "@bem-react/classname";

import "./styles.less";

const cx = cn("MainLayout");

export const MainLayout = ({ children }) => (
  <div className={cx()}>{children}</div>
);
