import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import ListOrderItems from "../components/productsAdmin/ListOderItems";
import useOrderItems from "../../hooks/useOderItem";

const OderItemManagement = () => {

  const { orderItems, loading, error, fetchOrderItems } = useOrderItems();

  useEffect(() => {
    fetchOrderItems();
    }, []);

  return (
    <AdminLayout>
      <div>
        <ListOrderItems data={orderItems} />
      </div>
    </AdminLayout>
  );
};

export default OderItemManagement; 
