import React from "react";
import AdminLayout from "../AdminLayout";
import ListProducts from "../components/productsAdmin/ListProducts";
const ProductManagement = () => {
  return (
    <AdminLayout>
      <div>
       <ListProducts/>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;