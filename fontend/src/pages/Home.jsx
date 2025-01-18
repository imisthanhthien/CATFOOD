import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full py-40 px-8 text-center rounded-3xl shadow-2xl bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900">
  {/* Background image with overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-3xl" 
       style={{ backgroundImage: 'url("path_to_your_image.jpg")' }}></div>
  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-3xl"></div>

  <div className="relative z-10">
    <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl tracking-tight">
      Chào mừng đến với <span className="text-yellow-500">Cửa Hàng Thức Ăn Mèo</span>!
    </h1>
    <p className="text-xl text-white mt-8 max-w-5xl mx-auto opacity-90 tracking-widest">
      Chúng tôi mang đến những sản phẩm chất lượng hạng sang cho mèo yêu của bạn. Từ thức ăn cao cấp đến đồ chơi và các sản phẩm chăm sóc, giúp mèo của bạn luôn khỏe mạnh và hạnh phúc.
    </p>

    <a href="/products">
      <button 
        className="mt-10 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-gradient-to-l hover:scale-110 transition-all duration-400 ease-in-out">
        Mua Ngay
      </button>
    </a>
  </div>
</div>

      <div className="mt-24 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 py-16">
        {['Thức Ăn Chất Lượng Cao', 'Đồ Chơi Tương Tác', 'Sản Phẩm Chăm Sóc Mèo'].map((title, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl rounded-xl p-8 text-center transform hover:scale-110 hover:shadow-3xl transition-all duration-700 ease-out"
          >
            <img
              src={`./public/Images/${index === 0 ? 'thucanchatluong1' : index === 1 ? 'dochoichomeo' : 'sanphamchamsocmeo'}.jpg`}
              alt={title}
              className="w-32 h-32 mx-auto mb-8 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-500"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-600 mt-4">{`Mô tả về ${title.toLowerCase()} với những đặc điểm vượt trội.`}</p>
          </div>
        ))}
      </div>

        



      <div className="mt-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 py-24 px-8 text-center rounded-lg shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-16">Khách Hàng Nói Gì Về Chúng Tôi</h2>
        <div className="flex flex-wrap justify-center gap-16">
          {['Sarah L.', 'John D.', 'Emily P.'].map((name, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-10 max-w-xs text-center transform hover:scale-110 hover:shadow-3xl transition-all duration-700 ease-out"
            >
              <p className="text-gray-600 mb-8">
                {`"Sản phẩm tuyệt vời! Mèo của tôi rất thích thức ăn từ cửa hàng này!"`}
              </p>
              <p className="font-semibold text-gray-800">{`- ${name}`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-32 max-w-7xl mx-auto px-8 py-16 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-16">Bài Viết Mới Nhất Của Chúng Tôi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {['Top 5 Mẹo Chăm Sóc Mèo', 'Chọn Thức Ăn Mèo Phù Hợp', 'Cách Chơi Với Mèo Của Bạn'].map((title, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-xl p-10 transform hover:scale-110 hover:shadow-3xl transition-all duration-700 ease-out"
            >
              <h3 className="text-2xl font-semibold mb-6">{title}</h3>
              <p className="text-gray-600 mb-8">
                {`Khám phá cách ${title.toLowerCase()} để chăm sóc tốt hơn cho mèo của bạn.`}
              </p>
              <a href="#" className="text-yellow-500 hover:underline inline-block mt-4 text-lg">
                Đọc Thêm
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900 text-white py-32 px-8 mt-32 text-center rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8">Tham Gia Cộng Đồng Yêu Mèo Của Chúng Tôi</h2>
        <p className="mt-4 text-lg">
          Đăng ký ngay để nhận các ưu đãi đặc biệt, cập nhật và mẹo chăm sóc mèo mới nhất!
        </p>
        <button className="mt-10 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-12 py-6 rounded-full font-bold shadow-2xl hover:bg-gradient-to-l hover:scale-110 transition-all duration-400 ease-in-out">
          Tham Gia Ngay
        </button>
      </div>
    </div>
  );
};

export default Home;
