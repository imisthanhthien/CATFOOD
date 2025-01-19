import React from 'react';
import { FaHome, FaBox, FaPercent, FaPhone, FaInfoCircle, FaCat } from 'react-icons/fa'; // Font Awesome Icons

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">


      {/* Menu */}
      <ul className="space-y-4">
        <li>
          <a href="/" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaHome className="mr-3" />
            Home
          </a>
        </li>
        <li>
          <a href="/products" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaBox className="mr-3" />
            Sản phẩm
          </a>
        </li>
        <li>
          <a href="/deals" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaPercent className="mr-3" />
            Khuyến mãi
          </a>
        </li>
        <li>
          <a href="/contact" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaPhone className="mr-3" />
            Liên hệ
          </a>
        </li>
        <li>
          <a href="/about" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaInfoCircle className="mr-3" />
            Giới thiệu
          </a>
        </li>
        <li>
          <a href="/cat-care" className="flex items-center py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-lg transition-all">
            <FaCat className="mr-3" />
            Chăm sóc Mèo
          </a>
        </li>
      </ul>

      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm">
        <p>&copy; 2025 CatFood Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
