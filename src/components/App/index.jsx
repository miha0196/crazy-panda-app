import React, { useState, useEffect, useRef } from "react";

import { Table } from "../Table";

import { fetchTableItems } from "../../api";

function App() {
  const [tableItems, setTableItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedValue, setSortedValue] = useState("id");
  const [sortDirection, setSortDirection] = useState("straight");
  const [filteredTableItems, setFilteredTableItems] = useState([]);
  const [pageCount, setPageCount] = useState(null);

  const activePage = useRef(1);

  useEffect(() => {
    fetchTableItems()
      .then((res) => {
        setTableItems(res);
        setPageCount(Math.ceil(res.length / 50));
        setFilteredTableItems(sortFunc(res, "id").slice(0, 50));
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sortFunc = (sortArr, value) => {
    let sortArrCopy = sortArr.concat();

    return sortArrCopy.sort((a, b) => {
      if (typeof a[value] === "number") {
        return a[value] - b[value];
      }

      if (a[value] > b[value]) {
        return 1;
      }

      if (a[value] < b[value]) {
        return -1;
      }

      return 0;
    });
  };

  const onSort = (value) => {
    if (
      (sortedValue === value && sortDirection === "reverse") ||
      sortedValue !== value
    ) {
      setFilteredTableItems(sortFunc(filteredTableItems, value));
      setSortDirection("straight");
    } else {
      setFilteredTableItems(sortFunc(filteredTableItems, value).reverse());
      setSortDirection("reverse");
    }

    setSortedValue(value);
  };

  const searching = (e) => {
    e.preventDefault();

    const str = e.target.value.toLowerCase();
    let sortArrCopy = tableItems.concat();

    sortArrCopy = sortArrCopy.filter(
      (item) =>
        item.name.toLowerCase().includes(str) ||
        item.origin.toLowerCase().includes(str)
    );

    setFilteredTableItems(sortFunc(sortArrCopy, sortedValue));
    setPageCount(Math.ceil(sortArrCopy.length / 50));
  };

  const changePage = (count) => {
    if (
      (activePage.current > 1 && count === -1) ||
      (activePage.current < pageCount && count === -2)
    ) {
      activePage.current =
        count === -1 ? --activePage.current : ++activePage.current;
      setFilteredTableItems(
        sortFunc(
          tableItems.slice(
            50 * (activePage.current - 1),
            50 * activePage.current
          ),
          sortedValue
        )
      );
    }

    if (count > 0) {
      activePage.current = count;
      setFilteredTableItems(
        sortFunc(
          tableItems.slice(
            50 * (activePage.current - 1),
            50 * activePage.current
          ),
          sortedValue
        )
      );
    }
  };

  return (
    <React.Fragment>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && (
        <Table
          filteredTableItems={filteredTableItems}
          onSort={onSort}
          sortedValue={sortedValue}
          sortDirection={sortDirection}
          searching={searching}
          changePage={changePage}
          pageCount={pageCount}
          activePage={activePage.current}
        />
      )}
    </React.Fragment>
  );
}

export default App;
