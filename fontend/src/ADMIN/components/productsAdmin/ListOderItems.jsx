import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "order_id", headerName: "Mã giao hàng", width: 150, editable: false, },
  { field: "product_id", headerName: "Mã sản phẩm", width: 150, editable: false, },
  { field: "quantity", headerName: "Số lượng", width: 100, editable: false, },
  { field: "price", headerName: "Giá", width: 150, editable: false, },
  { field: "time", headerName: "Thời gian thực hiện", width: 300, editable: false, },
];

export default function DataGridDemo({ data }) {
  console.log(data);
  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={data.map((user) => ({
          ...user,
          id: user.id,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
