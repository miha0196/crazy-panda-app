import React, { useState, useEffect, useRef } from "react";

import { Table } from "../Table";

import { fetchTableItems } from "../../api";

function App() {
  const [tableItems, setTableItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedValue, setSortedValue] = useState("id");
  const [sortDirection, setSortDirection] = useState("straight");
  const [filteredTableItems, setFilteredTableItems] = useState([]);
  const [displayedTableItems, setDisplayedTableItems] = useState([]);
  const [pageCount, setPageCount] = useState(null);

  const activePage = useRef(1);

  useEffect(() => {
    fetchTableItems()
      .then((res) => {
        setTableItems(res);
        setPageCount(Math.ceil(res.length / 50));
        setFilteredTableItems(res);
        setDisplayedTableItems(sortFunc(res, "id").slice(0, 50));
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
      setDisplayedTableItems(sortFunc(displayedTableItems, value));
      setSortDirection("straight");
    } else {
      setDisplayedTableItems(sortFunc(displayedTableItems, value).reverse());
      setSortDirection("reverse");
    }

    setSortedValue(value);
  };

  const changePage = (count) => {
    if (
      (activePage.current > 1 && count === -1) ||
      (activePage.current < pageCount && count === -2)
    ) {
      activePage.current =
        count === -1 ? --activePage.current : ++activePage.current;
      setDisplayedTableItems(
        sortFunc(
          filteredTableItems.slice(
            50 * (activePage.current - 1),
            50 * activePage.current
          ),
          sortedValue
        )
      );
    }

    if (count > 0) {
      activePage.current = count;
      setDisplayedTableItems(
        sortFunc(
          filteredTableItems.slice(
            50 * (activePage.current - 1),
            50 * activePage.current
          ),
          sortedValue
        )
      );
    }
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
    setDisplayedTableItems(sortFunc(sortArrCopy, sortedValue).slice(0, 50));
    setPageCount(Math.ceil(sortArrCopy.length / 50));
    activePage.current = 1;
  };

  console.log('render')

  return (
    <React.Fragment>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && (
        <Table
          displayedTableItems={displayedTableItems}
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
