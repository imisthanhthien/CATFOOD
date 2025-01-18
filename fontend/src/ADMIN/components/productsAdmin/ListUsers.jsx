import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const columns = [
  { field: "id", headerName: "UID", width: 300 },
  { field: "username", headerName: "Username", width: 150, editable: false },
  { field: "email", headerName: "Email", width: 250, editable: false },
  { field: "role", headerName: "Vai trò", width: 100, editable: false },
  {
    field: "isDisabled",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params) =>
      params.row.isDisabled ? (
        <span className="text-red-500 font-bold">Đã vô hiệu</span>
      ) : (
        <span className="text-green-500 font-bold">Hoạt động</span>
      ),
  },
  {
    field: "actions",
    headerName: "Thao tác",
    width: 150,  // Cố định chiều rộng của cột này
    renderCell: (params) => {
      const { isDisabled, id, role } = params.row;

      // Kiểm tra nếu role là admin thì không hiển thị nút "vô hiệu hóa"
      if (role === "admin") {
        return (
          <span className="text-gray-500 cursor-not-allowed">BOSS</span>
        );
      }

      return (
        <button
          className={`${
            isDisabled ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          } text-white font-semibold py-2 px-4 w-auto h-10 rounded-lg transition duration-300 ease-in-out 
          transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-${isDisabled ? "green" : "red"}-500 shadow-lg shadow-${isDisabled ? "green" : "red"}-300
          flex items-center justify-center`}
          onClick={() => toggleUserStatus(id, isDisabled)}
          disabled={role === "admin"} 
        >
          {isDisabled ? "Bật lại" : "Vô hiệu hóa"}
        </button>
      );
    },
  },
];

// Hàm chuyển đổi trạng thái tài khoản và reload trang
const toggleUserStatus = async (id, isDisabled) => {
  try {
    const userDocRef = doc(db, "users", id); 
    await updateDoc(userDocRef, { isDisabled: !isDisabled }); 
    alert(
      isDisabled
        ? "Tài khoản đã được bật lại thành công!"
        : "Tài khoản đã bị vô hiệu hóa thành công!"
    );
    // Reload trang sau khi thao tác xong
    window.location.reload();
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái tài khoản:", error);
  }
};

export default function DataGridDemo({ data }) {
  // Lọc danh sách người dùng để chỉ hiển thị role là 'admin' hoặc 'seller'
  const filteredData = data.filter(
    (user) => user.role === "admin" || user.role === "seller"
  );

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={filteredData.map((user) => ({
          ...user,
          id: user.id, // Chắc chắn rằng id có mặt trong mỗi hàng
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={5}
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
