import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useUserContext } from "../hooks/UserContext";
import useCustomers from "../hooks/useCustomers";
import CustomerInfoDialog from "./CustomerInfoDialog";

const Header = () => {
  const { user, handleLogout } = useUserContext();
  const { fetchCustomerByEmail, customer, customerLoading } = useCustomers();
  const cart = useSelector((state) => state.cart.CartArr);
  const cartItemCount = cart.length;

  const [isDialogOpen, setDialogOpen] = useState(false);

  // Xử lý khi người dùng nhấn vào icon tài khoản
  const handleUserClick = async () => {
    if (user && user.email) {
      await fetchCustomerByEmail(user.email); // Lấy thông tin khách hàng từ email
      setDialogOpen(true); // Mở dialog
    }
  };

  // Đóng dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold flex items-center space-x-3">
            <img
              src="/logo.jpg" // Đảm bảo đường dẫn hình ảnh chính xác
              alt="CatFood Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-youka font-semibold">CatFood</span>
            <span className="text-stores text-sm">Store</span>
          </a>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <nav>
              <ul className="flex space-x-8 justify-center py-2 font-sans">
                <li>
                  <a
                    href="/"
                    className="text-gray-800 hover:text-yellow-500 focus:outline-none border-2 border-transparent hover:border-yellow-400 px-4 py-2 rounded-full transition-colors"
                  >
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-800 hover:text-yellow-500 focus:outline-none border-2 border-transparent hover:border-yellow-400 px-4 py-2 rounded-full transition-colors"
                  >
                    Cửa hàng
                  </a>
                </li>
                <li>
                  <a
                    href="/deals"
                    className="text-gray-800 hover:text-yellow-500 focus:outline-none border-2 border-transparent hover:border-yellow-400 px-4 py-2 rounded-full transition-colors"
                  >
                    Khuyến mãi
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-800 hover:text-yellow-500 focus:outline-none border-2 border-transparent hover:border-yellow-400 px-4 py-2 rounded-full transition-colors"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-800 hover:text-yellow-500 focus:outline-none border-2 border-transparent hover:border-yellow-400 px-4 py-2 rounded-full transition-colors"
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* User Info / Icons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"

              >
                <FaUserAlt className="text-gray-800 text-xl"
                  // Mở dialog khi nhấn vào
                  onClick={handleUserClick}
                />
                <span 
                 onClick={handleUserClick}
                className="truncate max-w-[150px] text-sm text-gray-700">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 text-sm font-sans"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
              >
                <FaUserAlt className="text-gray-800 text-xl" />
                <span className="text-sm font-sans">Đăng nhập</span>
              </a>
            )}
            <a
              href="/cart"
              className="flex items-center space-x-2 hover:text-yellow-400 relative transition-colors"
            >
              <FaShoppingCart className="text-gray-800 text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute top-[8px] right-[-8px] bg-red-500 text-white rounded-full text-[10px] px-1 py-0.5">
                  {cartItemCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Customer Info Dialog */}
      {isDialogOpen && (
        <CustomerInfoDialog
          customer={customer}
          isLoading={customerLoading}
          onClose={closeDialog}
        />
      )}
    </>
  );
};

export default Header;
