import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import ListCateloris from "../components/productsAdmin/ListCateloris";
import useCategories from "../../hooks/useCategori";

const ProductCateloriManagement = () => {
  const { categories, loading, error, getCategories } = useCategories();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminLayout>
      <div>
      <ListCateloris data={categories} />
      </div>
    </AdminLayout>
  );
};

export default ProductCateloriManagement;
