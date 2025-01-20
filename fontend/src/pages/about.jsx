import React from 'react';

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">

      <h1 className=" uppercase text-6xl font-extrabold text-gray-900 mb-6 transform hover:scale-105 transition-all duration-300 ease-out">
  Về Chúng Tôi
</h1>
<p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed hover:text-gray-800 transition-all duration-300 ease-out">
  Chúng tôi là một cửa hàng cung cấp thức ăn cho mèo các loại. Với cam kết mang đến những sản phẩm chất lượng cao, chúng tôi luôn muốn chăm sóc mèo của bạn như chính con của mình!
</p>

<div className="bg-white shadow-lg rounded-xl p-8 mb-16 transform hover:scale-102 hover:shadow-xl transition-all duration-300 ease-out">
  <h2 className="text-3xl font-semibold text-gray-900 mb-6 uppercase">Sứ Mệnh Của Chúng Tôi</h2>
  <p className="text-lg text-gray-600 leading-relaxed hover:text-gray-700 transition-all duration-300 ease-out">
    Chúng tôi cam kết cung cấp cho bạn những sản phẩm tốt nhất cho mèo yêu của bạn. Với sự tỉ mỉ trong từng sản phẩm, chúng tôi luôn cố gắng mang lại sức khỏe, niềm vui và sự thoải mái cho những chú mèo của bạn.
  </p>
</div>

<div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 shadow-lg rounded-xl p-8 mb-16 transform hover:scale-102 hover:shadow-xl transition-all duration-300 ease-out">
  <h2 className="text-3xl font-semibold text-gray-900 mb-6 uppercase">Tầm Nhìn Của Chúng Tôi</h2>
  <p className="text-lg text-gray-600 leading-relaxed hover:text-gray-700 transition-all duration-300 ease-out">
    Chúng tôi muốn trở thành lựa chọn hàng đầu của mọi chủ mèo, nơi bạn có thể tìm thấy mọi thứ cần thiết để nuôi dưỡng, vui chơi, và chăm sóc cho mèo của mình. Chúng tôi mong muốn mang lại niềm vui và sự hài lòng cho cả bạn và mèo yêu của bạn.
  </p>
</div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto mb-16">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-all duration-500 ease-out">
            <img
              src="/public/meocute.jpg"
              alt="Quality"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 uppercase">Sản Phẩm Chất Lượng</h3>
            <p className="text-gray-600 mt-2">
              Chúng tôi cung cấp các sản phẩm cao cấp, được chọn lọc kỹ càng để đảm bảo sức khỏe và sự hạnh phúc cho mèo của bạn.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-all duration-500 ease-out">
            <img
              src="/public/meocute_suport.jpg"
              alt="Customer Support"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 uppercase">Hỗ Trợ Khách Hàng Tận Tâm</h3>
            <p className="text-gray-600 mt-2">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng để giúp đỡ bạn mọi lúc, từ việc lựa chọn sản phẩm cho đến việc giải đáp các thắc mắc.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 mb-16 transform hover:scale-105 transition-all duration-500 ease-out">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase">Đội Ngũ Của Chúng Tôi</h2>
          <p className="text-lg text-gray-600 mb-6">
            Đội ngũ của chúng tôi là những người yêu mèo, tận tâm và luôn nỗ lực để mang lại những sản phẩm tốt nhất cho khách hàng.
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <img
                src="/public/avatar_custom_2021.jpg"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <p className="font-semibold text-gray-800">Nguyễn Thành Thiện</p>
              <p className="text-gray-600">Giám Đốc Điều Hành</p>
            </div>

          </div>
        </div>

        <div className="bg-purple-600 text-white py-16 px-6 mt-16 text-center rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-out">
          <h2 className="text-3xl font-bold uppercase">Hãy Tham Gia Cùng Chúng Tôi!</h2>
          <p className="mt-4">
            Nếu bạn yêu mèo và muốn mang lại sự thoải mái cho chúng, hãy tham gia cộng đồng yêu mèo của chúng tôi ngay hôm nay!
          </p>
          <a href='https://www.facebook.com/groups/daomeohnvn/'>
          <button className="mt-6 bg-yellow-400 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110">
            Khám Phá Ngay
          </button>
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default About;
