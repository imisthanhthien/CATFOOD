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
            <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">
              Chào mừng đến với trang quản trị
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Quản lý mèo"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-teal-600">Quản lý mèo</h3>
                  <p className="text-gray-600 mt-2">
                    Xem, thêm, sửa và xóa thông tin mèo trong cửa hàng.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Quản lý đơn hàng"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-teal-600">Quản lý đơn hàng</h3>
                  <p className="text-gray-600 mt-2">
                    Quản lý đơn hàng và theo dõi tiến độ giao hàng cho khách hàng.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Quản lý người dùng"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-teal-600">Quản lý người dùng</h3>
                  <p className="text-gray-600 mt-2">
                    Quản lý thông tin tài khoản người dùng và phân quyền quản trị.
                  </p>
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
