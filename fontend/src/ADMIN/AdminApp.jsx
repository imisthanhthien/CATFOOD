import { Routes, Route } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import CustomerManagement from './pages/CustomerManagement';
import ProtectedRoute from '../ProtectedRoute';
import OderManagement from './pages/OderManagement';
import ProductCateloriManagement from './pages/ProductCateloriManagement';
import OderItemManagement from './pages/OderItemManagement';
import DiscountManagement from './pages/DiscountManagement';
import StatisticsManagement from './pages/StatisticsManagement';
import VoucherManagements from './pages/VoucherManagements';
import { useUserContext } from '../hooks/UserContext';
const AdminApp = () => {

  const { user } = useUserContext();
  
    // Kiểm tra xem có user hay không, nếu không có thì trả về false
    const isAdminPage = user && user.role === 'admin'; 
    const isseller = user && user.role === 'seller'; 
    
  return (
<div className="w-full h-full">
<main >
<Routes>
      <Route path="/AdminHome" element={<ProtectedRoute element={<AdminHome />} />} />
      <Route path="/UserManagement" element={<ProtectedRoute element={<UserManagement />} />} />
      <Route path="/ProductManagement" element={<ProtectedRoute element={<ProductManagement />}  />} />
      <Route path="/CustomerManagement" element={<ProtectedRoute element={<CustomerManagement />}  />} />
      <Route path="/OderManagement" element={<ProtectedRoute element={<OderManagement />}  />} />
      <Route path="/OderItemManagement" element={<ProtectedRoute element={<OderItemManagement />}  />} />
      <Route path="/ProductCateloriManagement" element={<ProtectedRoute element={<ProductCateloriManagement />}  />} />
      <Route path="/DiscountManagement" element={<ProtectedRoute element={<DiscountManagement />} />} />
      <Route path="/VoucherManagements" element={<ProtectedRoute element={<VoucherManagements />}  />} />
      <Route path="/StatisticsManagement" element={<ProtectedRoute element={<StatisticsManagement />}  />} />
    </Routes>
</main>
</div>
  );
};
export default AdminApp;
