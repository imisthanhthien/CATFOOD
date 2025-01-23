import React from "react";
import { useUserContext } from "./hooks/UserContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useUserContext();

  // Kiểm tra nếu chưa đăng
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-3xl font-semibold mb-4 text-yellow-400">
            Cần đăng nhập để vào đường link này
          </h2>
          <p className="text-xl mb-6">
            Để tiếp tục, vui lòng đăng nhập. Bạn có thể làm điều đó ngay bây giờ!
          </p>
          <a
            href="/auth"
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    );
  }

  //Kiểm tra nếu không phải Admin , seller
  if ( user.role !== "admin" && user.role !== "seller") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        <div className="bg-red-900 p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-3xl font-semibold mb-4 text-red-400">
            Bạn không có quyền truy cập
          </h2>
          <p className="text-xl mb-6">
            Bạn không đủ quyền để truy cập vào trang này. Vui lòng kiểm tra lại quyền truy cập của bạn hoặc quay lại trang sản phẩm.
          </p>
          <a
            href="/products"
            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Quay lại sản phẩm
          </a>
        </div>
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
