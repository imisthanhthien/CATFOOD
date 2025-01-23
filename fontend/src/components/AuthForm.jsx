import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext";
import useCustomers from "../hooks/useCustomers";

const Auth = () => {
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();
  const { addCustomer } = useCustomers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;

      if (isLogin) {
        // Đăng nhập
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
      } else {
        // Đăng ký
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        const newCustomer = { name, email, phone, address };
        await addCustomer(newCustomer);

        // Tạo người dùng mới trong Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username,
          role: "viewer",
          isDisabled: false,
        });

        setMessage(`Đăng ký thành công với email: ${user.email}`);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (userData.isDisabled) {
          setMessage(
            "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ qua email: abc@gmail.com để biết thêm chi tiết."
          );
          return;
        }

        handleLogin(userData.role, userData.username, userData.email);
        setMessage(`Đăng nhập thành công với tài khoản: ${userData.username}`);

        // Điều hướng dựa trên role người dùng
        if (userData.role == "admin" || userData.role == "seller") {
          navigate("/Admin/AdminHome");
        } else {
          navigate("/products");
        }
      } else {
        setMessage("Không tìm thấy dữ liệu người dùng!");
      }
    } catch (error) {
      setMessage(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      let docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          username: user.displayName || "GoogleUser",
          role: "viewer",
          isDisabled: false,
        });
        docSnap = await getDoc(docRef);
      }

      const userData = docSnap.data();

      if (userData.isDisabled) {
        setMessage(
          "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ qua email: abc@gmail.com để biết thêm chi tiết."
        );
        return;
      }

      handleLogin(userData.role, userData.username, userData.email);
      setMessage(`Đăng nhập thành công với Google: ${userData.username}`);

      // Điều hướng dựa trên role người dùng
      if (userData.role == "admin" || userData.role == "seller") {
        navigate("/Admin/AdminHome");
      } else {
        navigate("/products");
      }
    } catch (error) {
      setMessage(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl  mb-4 text-center uppercase">
          {isLogin ? "Đăng nhập tài khoản" : "Đăng ký tài khoản"}
        </h2>
        <h2 className="text-ml mb-4 text-center text-gray-400 ">
          {isLogin ? "Nhập email và mật khẩu" : "Nhập thông tin đăng ký"}
        </h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Họ tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={!isLogin}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required={!isLogin}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition ${loading ? "bg-gray-400" : ""}`}
          >
            {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition mb-4 flex items-center justify-center gap-3 ${loading ? "bg-gray-400" : ""}`}
          >
            <img
              className="w-8 h-8 filter invert align-middle"
              src="/google-plus-svgrepo-com.svg"
              alt="Google Logo"
            />
            <span className="text-base font-medium">Đăng nhập bằng Google</span>
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            Chuyển sang {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default Auth;
