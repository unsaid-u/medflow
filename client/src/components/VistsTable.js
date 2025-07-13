import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, Typography } from "@mui/material";

const COLUMNS = [
  { field: "patient_id", headerName: "Patient ID", flex: 1, sortable: false },
  { field: "patient_name", headerName: "Name", flex: 1, sortable: false },
  {
    field: "clinician_id",
    headerName: "Clinician ID",
    flex: 1,
    sortable: false,
  },
  { field: "visit_type", headerName: "Visit Type", flex: 1, sortable: false },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      const fullText = params.value || "";
      const truncated =
        fullText.length > 20 ? `${fullText.slice(0, 10)}...` : fullText;

      return (
        <Tooltip title={fullText} arrow>
          <Typography variant="body2" noWrap>
            {truncated}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Created At",
    flex: 1,
    sortable: true,
    type: "dateTime",
    valueGetter: (value) => {
      return new Date(value);
    },
    valueFormatter: (value) => new Date(value).toLocaleString(),
  },
];

function VistsTable({
  visits,
  totalCount,
  paginationModel,
  onPaginationModelChange,
}) {
  return (
    <DataGrid
      rows={visits}
      columns={COLUMNS}
      rowCount={totalCount}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[10, 20, 25, 50, 100]}
      paginationMode="server"
    />
  );
}

export default VistsTable;
