import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-lg p-8 transform hover:scale-105 transition-all duration-500 ease-out">

        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-lg">
          Liên Hệ Với Chúng Tôi
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8 opacity-90">
          Hãy để chúng tôi biết nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào. Chúng tôi luôn sẵn sàng giúp đỡ bạn và người bạn mèo của bạn!
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Tên Của Bạn</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Lời Nhắn</label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            Gửi Lời Nhắn
          </button>
        </form>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Thông Tin Liên Lạc</h2>
          <div className="space-y-4 text-gray-600">
            <p className="flex justify-center items-center">
              <span className="mr-2 text-xl">📧</span>
              <span>Email: <a href="mailto:support@meowshop.com" className="text-yellow-400 hover:underline transition-all duration-300 ease-in-out">support@meowshop.com</a></span>
            </p>
            <p className="flex justify-center items-center">
              <span className="mr-2 text-xl">📞</span>
              <span>Điện Thoại: <a href="tel:+123456789" className="text-yellow-400 hover:underline transition-all duration-300 ease-in-out">+123 456 789</a></span>
            </p>
            <p className="flex justify-center items-center">
              <span className="mr-2 text-xl">📍</span>
              <span>Địa Chỉ: 123 Phố Mèo, Hà Nội, Việt Nam</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
