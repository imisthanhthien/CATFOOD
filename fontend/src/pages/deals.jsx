import React from 'react';

const Deal = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-2xl">
          Khuyến Mãi Đặc Biệt
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto opacity-90">
          Cập nhật các khuyến mãi hấp dẫn và các ưu đãi đặc biệt cho người bạn mèo của bạn. Đừng bỏ lỡ cơ hội này để chăm sóc mèo yêu với giá ưu đãi!
        </p>

        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 text-white py-16 px-6 mb-12 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-700 ease-out">
          <h2 className="text-4xl font-bold mb-4">Khuyến Mãi Giới Hạn Thời Gian</h2>
          <p className="text-lg mb-6">
            Chỉ trong tuần này, tất cả các sản phẩm thức ăn cho mèo sẽ được giảm giá lên đến 30%. Hãy nhanh tay để sở hữu những sản phẩm chất lượng cao với mức giá không thể tốt hơn!
          </p>
          <button className="bg-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
            Mua Ngay
          </button>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-8">Các Deal Nổi Bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Deal 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Thức Ăn Mèo Cao Cấp</h3>
              <p className="text-gray-600 mt-2">Giảm giá 20% cho các loại thức ăn mèo cao cấp. Bảo vệ sức khỏe cho mèo yêu của bạn với mức giá cực tốt.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 250,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Deal 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Đồ Chơi Tương Tác Mèo</h3>
              <p className="text-gray-600 mt-2">Mua 1 đồ chơi, nhận 1 đồ chơi miễn phí! Tăng cường niềm vui cho mèo yêu của bạn ngay hôm nay.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 150,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Deal 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Combo Chăm Sóc Mèo</h3>
              <p className="text-gray-600 mt-2">Mua combo chăm sóc mèo với giá ưu đãi, bao gồm dầu tắm, bộ chải lông và các sản phẩm làm đẹp khác.</p>
              <p className="text-xl font-bold text-yellow-500 mt-4">Giá: 400,000đ</p>
              <button className="mt-4 bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 py-16 px-6 mt-16 text-center rounded-lg shadow-xl transform hover:scale-105 transition-all duration-700 ease-out">
          <h2 className="text-4xl font-bold text-white mb-6">Đừng Bỏ Lỡ Cơ Hội!</h2>
          <p className="text-xl text-white mb-6">
            Các khuyến mãi chỉ diễn ra trong thời gian giới hạn. Hãy nhanh tay chọn lựa sản phẩm yêu thích và mua ngay để nhận ưu đãi đặc biệt!
          </p>
          <button className="bg-yellow-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
            Khám Phá Các Deal Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deal;
