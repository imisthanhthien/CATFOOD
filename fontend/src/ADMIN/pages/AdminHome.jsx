import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import AdminLayout from "../AdminLayout";

const AdminHome = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <AdminLayout>
     <div className="bg-gray-100 min-h-screen py-6 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-4xl font-extrabold text-center text-teal-600 mb-8 uppercase transform transition-transform duration-500 hover:scale-105">
        Chào mừng đến với trang quản trị
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Quản lý mèo */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50">
          <img
            src="/public/home1.jpg"
            alt="Quản lý mèo"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-teal-700">Quản lý mèo</h3>
            <p className="mt-2 text-gray-500">Quản lý thông tin mèo của bạn hiệu quả hơn.</p>
          </div>
        </div>
        
        {/* Quản lý đơn hàng */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50">
          <img
            src="/public/home2.jpg"
            alt="Quản lý đơn hàng"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-teal-700">Quản lý đơn hàng</h3>
            <p className="mt-2 text-gray-500">Dễ dàng theo dõi và xử lý các đơn hàng.</p>
          </div>
        </div>
        
        {/* Quản lý người dùng */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50">
          <img
            src="/public/home3.jpg"
            alt="Quản lý người dùng"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-teal-700">Quản lý người dùng</h3>
            <p className="mt-2 text-gray-500">Quản lý và theo dõi người dùng dễ dàng.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </AdminLayout>
  );
};

export default AdminHome;
