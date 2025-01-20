import React, { useEffect, useState } from "react";

const Chat = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Tạo một hàm hiển thị tooltip ngẫu nhiên
  useEffect(() => {
    const timer = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000); 
    }, Math.random() * 10000 + 5000); 

    return () => clearInterval(timer); 
  }, []);

  return (
    <div>
      {/* Icon Zalo */}
      <a
        href="https://zalo.me/0336165737"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-4 transform animate-rotateSmooth rounded-full w-12 h-12 flex justify-center items-center transition-all duration-300 bg-transparent z-10"
      >
        <img
          src="/public/icons8-zalo.svg"
          alt="Zalo"
          className="w-full h-full object-contain"
        />
      </a>

      {/* Tooltip Zalo (hiển thị bên trái icon) */}
      {showTooltip && (
        <div className="fixed bottom-16 right-20  text-black text-xs py-2 px-4 rounded-lg  opacity-90 transform scale-105 transition-all duration-300 ease-in-out max-w-xs">
          <div className="p-2 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-md shadow-md text-white relative">
            <span>Chat với chúng tôi trên Zalo</span>
            <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"></div> {/* Bỏ viền trắng ở đây */}
          </div>
        </div>
      )}

      {/* Icon Messenger */}
      <a
        href="https://m.me/catfoodreactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-3 right-4 transform animate-wave rounded-full w-12 h-12 flex justify-center items-center transition-all duration-300 bg-transparent z-0"
      >
        <img
          src="/public/icons8-facebook-messenger.svg"
          alt="Messenger"
          className="w-full h-full object-contain"
        />
      </a>

      {/* Tooltip Messenger (hiển thị bên trái icon) */}
      {showTooltip && (
        <div className="fixed bottom-3 right-20  text-black text-xs py-2 px-4 rounded-lg  opacity-90 transform scale-105 transition-all duration-300 ease-in-out max-w-xs">
          <div className="p-2 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-md shadow-md text-white relative">
            <span>Chat với chúng tôi trên Messenger</span>
            <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"></div> {/* Bỏ viền trắng ở đây */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
