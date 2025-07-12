import React from "react";

import Pagination from "@mui/material/Pagination";

function Paginator() {
  // ! pass an onChange handler and totolCount to it
  return <Pagination count={10} size="large" />;
}

export default Paginator;
