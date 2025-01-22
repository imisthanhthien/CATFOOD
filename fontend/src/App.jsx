import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/about';
import Contact from './pages/Contact';
import Deal from './pages/deals';
import Cart from './pages/cart';
import Auth from './components/AuthForm';
import ProductDetail from './components/ProductDetail'; 
import { UserProvider,useUserContext } from './hooks/UserContext';
import AdminApp from './ADMIN/AdminApp';
import ProtectedRoute from './ProtectedRoute';
import Chat from './components/chat';
const Layout = () => {
  const { user } = useUserContext();

  // Kiểm tra xem có user hay không, nếu không có thì trả về false
  const isAdminPage = user && user.role === 'admin'; 

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Header />} {/* Chỉ hiển thị Header nếu không phải admin */}
      <main className="flex-1  bg-white p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/deals" element={<Deal />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminApp />} adminOnly={true} />} />
        </Routes>
      </main>
     
      {!isAdminPage && <Footer />} 
      {!isAdminPage &&  <Chat/>}{/* Chỉ hiển thị Footer nếu không phải admin */}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
}

export default App;
