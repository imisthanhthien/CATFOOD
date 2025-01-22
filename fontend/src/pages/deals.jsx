import React from 'react';

const Deal = () => {
  return (
    <div className=" min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className=" uppercase text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-2xl">
          Khuyến Mãi Đặc Biệt
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto opacity-90">
          Cập nhật các khuyến mãi hấp dẫn và các ưu đãi đặc biệt cho người bạn mèo của bạn. Đừng bỏ lỡ cơ hội này để chăm sóc mèo yêu với giá ưu đãi!
        </p>

        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 text-white py-16 px-6 mb-12 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-700 ease-out">
          <h2 className="text-4xl font-bold mb-4 uppercase">Khuyến Mãi Giới Hạn Thời Gian</h2>
          <p className="text-lg mb-6">
           Khách hàng mới khi đăng ký tài khoản sẽ nhận 2 voucher giảm giá NEW50K và NEW30PERCENT. Nhanh tay ưu đãi có thời hạn hết ngày 21/06/2025

          </p>
          <a href="/auth">
            <button className="bg-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
              Đăng Ký ngay
            </button>
          </a>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-8 uppercase">Các Deal Nổi Bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="/public/thucanmeocapcap_deal.jpg"
              alt="Deal 1"
              class="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 uppercase">Thức Ăn Cao Cấp Cho Mèo <nav></nav></h3>
              <p className="text-gray-600 mt-2">Giảm giá 20% cho các loại thức ăn mèo cao cấp. Bảo vệ sức khỏe cho mèo yêu của bạn với mức giá cực tốt.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 250,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="/public/thucanmeocapcap_deal2.jpg"
              alt="Deal 2"
              class="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 uppercase">Thức ăn bổ sung cho mèo </h3>
              <p className="text-gray-600 mt-2">Giảm 18% cho các loại thức ăn bổ sung dinh dưỡng cho mèo. Giúp mèo luôn khỏe mạnh mỗi ngày.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 150,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="/public/thucanmeocapcap_dea3l.jpg"
              alt="Deal 3"
              class="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />

            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 uppercase">Thức ăn hỗn hợp </h3>
              <p className="text-gray-600 mt-2">Giảm 24% cho các loại thức ăn hỗn hợp bổ sung đầy đủ các chất cần thiết cho mèo, tăng sức đề kháng.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 400,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 py-16 px-6 mt-16 text-center rounded-lg shadow-xl transform hover:scale-105 transition-all duration-700 ease-out">
          <h2 className="text-4xl font-bold text-white mb-6 uppercase">Đừng Bỏ Lỡ Cơ Hội!</h2>
          <p className="text-xl text-white mb-6">
            Các khuyến mãi chỉ diễn ra trong thời gian giới hạn. Hãy nhanh tay chọn lựa sản phẩm yêu thích và mua ngay để nhận ưu đãi đặc biệt!
          </p>
       
          <a href="/products">
            <button className="bg-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
            Khám Phá Các Deal Ngay
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Deal;
