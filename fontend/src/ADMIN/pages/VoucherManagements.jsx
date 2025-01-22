import React from "react";
import AdminLayout from "../AdminLayout";
import ListVouchers from "../components/productsAdmin/ListVouchers";
const VoucherManagements = () => {
  return (
    <AdminLayout>
      <div>
        <ListVouchers/>
      </div>
    </AdminLayout>
  );
};

export default VoucherManagements;