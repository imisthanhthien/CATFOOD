import React from 'react';

function NotFound404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
        <p className="text-sm text-gray-500 mb-8">
          Trang bạn tìm không tồn tại
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Về Trang Chủ
        </a>
      </div>
    </div>
  );
}

export default NotFound404;
