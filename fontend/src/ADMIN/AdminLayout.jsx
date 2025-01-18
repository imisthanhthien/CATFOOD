import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart, AiOutlineBarChart, AiOutlineLogout } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { FaBoxOpen, FaTags } from "react-icons/fa";
import { MdLocalMall } from "react-icons/md";
import { useUserContext } from "../hooks/UserContext"; 


const AdminLayout = ({ children }) => {

   const { user, handleLogout } = useUserContext();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
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
          <NavLink
            to="/admin/AdminHome"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AiOutlineDashboard className="mr-3 text-xl" />
            {isSidebarOpen && 'Trang chủ'}
          </NavLink>

          <NavLink
            to="/admin/UserManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AiOutlineUser className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý người dùng'}
          </NavLink>

          <NavLink
            to="/admin/ProductManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <MdLocalMall className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý sản phẩm'}
          </NavLink>

          <NavLink
            to="/admin/CustomerManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AiOutlineUser className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý khách hàng'}
          </NavLink>

          <NavLink
            to="/admin/OderManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <AiOutlineShoppingCart className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý đơn hàng'}
          </NavLink>

          <NavLink
            to="/admin/OderItemManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FaBoxOpen className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý chi tiết đơn hàng'}
          </NavLink>

          <NavLink
            to="/admin/ProductCateloriManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <MdCategory className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý chi tiết sản phẩm'}
          </NavLink>

          <NavLink
            to="/admin/DiscountManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FaTags className="mr-3 text-xl" />
            {isSidebarOpen && 'Quản lý giảm giá'}
          </NavLink>

          <NavLink
            to="/admin/StatisticsManagement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
              <AiOutlineBarChart className="mr-3 text-xl" />
            {isSidebarOpen && 'Báo cáo thống kê'}
          </NavLink>
        </nav>
      </div>
    </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý</h1>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">Xin chào, Admin</p>
            <button
             onClick={handleLogout}
             className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700">
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
