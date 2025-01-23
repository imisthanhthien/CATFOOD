import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineTeam,AiOutlineUser,AiOutlineShoppingCart, AiOutlineBarChart } from "react-icons/ai";
import { MdLocalMall, MdCategory } from "react-icons/md";
import { FaUserFriends, FaTags, FaGift, FaBoxOpen } from "react-icons/fa";
import { useUserContext } from "../hooks/UserContext";

const AdminLayout = ({ children }) => {
  const { user, handleLogout } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Các liên kết dành cho admin
  const adminLinks = [
    {
      to: "/admin/AdminHome",
      icon: <AiOutlineDashboard className="mr-3 text-xl" />, // Icon phù hợp để thể hiện dashboard
      label: "Trang chủ",
    },
    {
      to: "/admin/UserManagement",
      icon: <AiOutlineTeam className="mr-3 text-xl" />, // Icon phù hợp để quản lý người dùng
      label: "Quản lý người dùng",
    },
    {
      to: "/admin/ProductManagement",
      icon: <MdLocalMall className="mr-3 text-xl" />, // Icon phù hợp để quản lý sản phẩm
      label: "Quản lý sản phẩm",
    },
    {
      to: "/admin/CustomerManagement",
      icon: <FaUserFriends className="mr-3 text-xl" />, // Icon phù hợp để quản lý khách hàng
      label: "Quản lý khách hàng",
    },
    {
      to: "/admin/OderManagement",
      icon: <AiOutlineShoppingCart className="mr-3 text-xl" />, // Icon phù hợp để quản lý đơn hàng
      label: "Quản lý đơn hàng",
    },
    {
      to: "/admin/DiscountManagement",
      icon: <FaTags className="mr-3 text-xl" />, // Icon phù hợp để quản lý giảm giá
      label: "Quản lý giảm giá",
    },
    {
      to: "/admin/VoucherManagements",
      icon: <FaGift className="mr-3 text-xl" />, // Icon phù hợp để quản lý voucher
      label: "Quản lý voucher",
    },
    {
      to: "/admin/ProductCateloriManagement",
      icon: <MdCategory className="mr-3 text-xl" />, // Icon phù hợp để quản lý danh mục sản phẩm
      label: "Quản lý danh mục sản phẩm",
    },
    {
      to: "/admin/OderItemManagement",
      icon: <FaBoxOpen className="mr-3 text-xl" />, // Icon phù hợp để quản lý chi tiết đơn hàng
      label: "Quản lý chi tiết đơn hàng",
    },
    {
      to: "/admin/StatisticsManagement",
      icon: <AiOutlineBarChart className="mr-3 text-xl" />, // Icon phù hợp để thống kê báo cáo
      label: "Thống kê báo cáo",
    },
  ];
  

  // Các liên kết dành cho seller
  const sellerLinks = [
    {
      to: "/admin/AdminHome",
      icon: <AiOutlineDashboard className="mr-3 text-xl" />,
      label: "Trang chủ",
    },
    {
      to: "/admin/ProductManagement",
      icon: <MdLocalMall className="mr-3 text-xl" />,
      label: "Quản lý sản phẩm",
    },
    {
      to: "/admin/CustomerManagement",
      icon: <AiOutlineUser className="mr-3 text-xl" />,
      label: "Quản lý khách hàng",
    },
    {
      to: "/admin/DiscountManagement",
      icon: <FaTags className="mr-3 text-xl" />, // Icon phù hợp để quản lý giảm giá
      label: "Quản lý giảm giá",
    },
    {
      to: "/admin/VoucherManagements",
      icon: <FaGift className="mr-3 text-xl" />, // Icon phù hợp để quản lý voucher
      label: "Quản lý voucher",
    },
    {
      to: "/admin/OderManagement",
      icon: <AiOutlineShoppingCart className="mr-3 text-xl" />,
      label: "Quản lý đơn hàng",
    },
  ];

  const links = user.role === "admin" ? adminLinks : sellerLinks;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`flex ${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300`}>
        <div className="w-auto bg-gray-800 text-white flex flex-col">
          {/* Icon to toggle sidebar */}
          <button
            onClick={toggleSidebar}
            className="absolute top-6 left-10 text-white focus:outline-none p-1 rounded-md hover:bg-gray-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-5 h-5 transition-all ${isSidebarOpen ? 'rotate-45' : 'rotate-0'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M3 5h18M3 12h18M3 19h18"}
              />
            </svg>
          </button>

          <nav className="flex-1 px-1 py-6 space-y-6 pt-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-all ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.icon}
                {isSidebarOpen && link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý</h1>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">Xin chào, {user.role}</p>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
