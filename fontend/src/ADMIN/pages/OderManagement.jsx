import React from "react";
import AdminLayout from "../AdminLayout";
import ListOrders from "../components/productsAdmin/ListOders";
const OderManagement = () => {
  return (
    <AdminLayout>
      <div>
        <ListOrders/>
      </div>
    </AdminLayout>
  );
};

export default OderManagement; 
