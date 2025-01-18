import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-gray-50 to-white text-gray-800 py-8 shadow-lg border-t border-b border-gray-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Thông tin liên hệ */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">Thông tin liên hệ</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              <b>abcxyz.vn</b> là trang bán thức ăn cho mèo bởi <b>ABCXYZ</b>. <b>Công ty TNHH ABCXYZ</b>. Giấy chứng nhận Đăng ký Kinh doanh số 77777777 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 00/00/0000.
            </p>
            <div className="mt-2 flex justify-center">
              <a href="" target="_blank" rel="noreferrer">
                <img
                  src="//theme.hstatic.net/200000263355/1001161916/14/footer_logobct_img.png?v=135"
                  alt="Bộ Công Thương"
                  className="w-28 h-auto"
                />
              </a>
            </div>
          </div>

          {/* Thông tin cửa hàng */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">Thông tin cửa hàng</h4>
            <ul className="text-sm text-gray-600 space-y-3">
              <li><b>Địa chỉ</b>: <a href="#" className="text-blue-500 hover:underline transition-all duration-300">123 vũ trụ, p. 11, quận Thiên Đường</a></li>
              <li><b><a href="tel:0988004089" className="text-blue-500 hover:underline transition-all duration-300">0908.xxx.xxx</a></b></li>
              <li><b>abcxyz@abcxyz.vn</b></li>
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">Hỗ trợ khách hàng</h4>
            <ul className="text-sm text-gray-600 space-y-3">
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Tìm kiếm</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Giới thiệu</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Chính sách thanh toán</a></li>
              <li><a href="/pages/chinh-sach-giao-hang" className="text-blue-500 hover:underline transition-all duration-300">Chính sách giao hàng</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="text-blue-500 hover:underline transition-all duration-300">Điều khoản dịch vụ</a></li>
            </ul>
          </div>

          {/* Chăm sóc khách hàng */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">Chăm sóc khách hàng</h4>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shadow-xl transform transition duration-500 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.806 473.806" className="w-8 h-8 text-gray-800">
                  <g>
                    <path
                      d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z"
                    />
                  </g>
                </svg>
              </div>
              <div>
                <span className="block font-semibold text-sm text-gray-800">
                  <a href="tel:0988004089" className="text-blue-500 hover:underline transition-all duration-300">
                    0908.xxx.xxx
                  </a>
                </span>
                <u className="text-blue-500 hover:underline transition-all duration-300">info@abcxyz.vn</u>
              </div>
            </div>

            <h4 className="mt-4 text-lg font-semibold text-gray-900">Follow Us</h4>

            <ul className="flex space-x-6 mt-4">
              <li>
                <a href="#" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600 transition-all duration-300">
                  <FaFacebook size={24} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600 transition-all duration-300">
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600 transition-all duration-300">
                  <FaTiktok size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
