import React from "react";

import Pagination from "@mui/material/Pagination";

function Paginator({ count, handleChange }) {
  const handlePaginationChange = (event, value) => {
    handleChange(value);
  };

  return (
    <Pagination count={count} size="large" onChange={handlePaginationChange} />
  );
}

export default Paginator;
