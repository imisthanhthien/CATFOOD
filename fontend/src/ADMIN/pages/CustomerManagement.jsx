import React from "react";
import AdminLayout from "../AdminLayout";
import ListCustomers from "../components/productsAdmin/ListCustomers";
const CustomerManagement = () => {
  return (
    <AdminLayout>
      <div>
      <ListCustomers/>
      </div>
    </AdminLayout>
  );
};

export default CustomerManagement;