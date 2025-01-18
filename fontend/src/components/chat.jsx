import React, { useEffect, useRef } from "react";

const Chat = () => {
  const customerChatRef = useRef(null); // Khai báo ref bằng useRef

  useEffect(() => {
    // Kiểm tra nếu Facebook SDK chưa được tải
    if (!window.FB) {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = () => {
          if (window.FB) {
            window.FB.init({
              appId: "589622557339885", 
              xfbml: true,
              version: "v11.0",
            });

            // Khởi tạo plugin chat Messenger
            if (customerChatRef.current) {
              window.FB.CustomerChat.setRef(customerChatRef.current);
            }
          }
        };
      })(document, "script", "facebook-jssdk");
    } else {
      window.FB.init({
        appId: "589622557339885", // Thay YOUR_APP_ID bằng App ID của bạn
        xfbml: true,
        version: "v11.0",
      });

      // Khởi tạo plugin chat Messenger
      if (customerChatRef.current) {
        window.FB.CustomerChat.setRef(customerChatRef.current);
      }
    }
  }, []);

  const handleChatClick = () => {
    // Khi người dùng nhấn vào icon chat, mở cửa sổ Messenger
    if (window.FB) {
      window.FB.CustomerChat.show();
    }
  };

  return (
    <div>
      {/* Biểu tượng Messenger */}
      <div className="fixed bottom-10 right-10">
        <div
          className="bg-blue-600 p-3 rounded-full text-white shadow-lg cursor-pointer"
          onClick={handleChatClick}
        >
          <i className="fab fa-facebook-messenger text-2xl"></i>
        </div>
      </div>
     
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="100017528383929" 
        ref={customerChatRef} 
      ></div>
    </div>
  );
};

export default Chat;
