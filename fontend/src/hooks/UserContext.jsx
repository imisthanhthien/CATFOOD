import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Khởi tạo user từ localStorage nếu có
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);

  const handleLogin = (role, username, email) => {
    const userData = { role, username, email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, handleLogin,handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
