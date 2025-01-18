import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import ListUsers from "../components/productsAdmin/ListUsers";
import { getDocs, collection } from "firebase/firestore"; // Sử dụng getDocs thay vì getDoc
import { db } from "../../firebase";

const UserManagement = () => {
  const userCollectionRef = collection(db, "users"); // Đảm bảo tên biến rõ ràng
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      // Lấy tất cả các tài liệu từ tập hợp "user"
      const querySnapshot = await getDocs(userCollectionRef);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
      setUsers(usersData); // Cập nhật state với dữ liệu người dùng
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <ListUsers data={users} /> {/* Truyền dữ liệu người dùng vào component ListUsers */}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
