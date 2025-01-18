import React from "react";
import AdminLayout from "../AdminLayout";
import ListDiscount from "../components/productsAdmin/ListDiscount";
const DiscountManagement = () => {
  return (
    <AdminLayout>
      <div>
      <ListDiscount/>
      </div>
    </AdminLayout>
  );
};

export default DiscountManagement;