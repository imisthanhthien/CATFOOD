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

const AdminApp = () => {
  return (
<div className="w-full h-full">
<main >
<Routes>
      <Route path="/AdminHome" element={<ProtectedRoute element={<AdminHome />} adminOnly={false} />} />
      <Route path="/UserManagement" element={<ProtectedRoute element={<UserManagement />} adminOnly={false} />} />
      <Route path="/ProductManagement" element={<ProtectedRoute element={<ProductManagement />} adminOnly={false} />} />
      <Route path="/CustomerManagement" element={<ProtectedRoute element={<CustomerManagement />} adminOnly={false} />} />
      <Route path="/OderManagement" element={<ProtectedRoute element={<OderManagement />} adminOnly={false} />} />
      <Route path="/OderItemManagement" element={<ProtectedRoute element={<OderItemManagement />} adminOnly={false} />} />
      <Route path="/ProductCateloriManagement" element={<ProtectedRoute element={<ProductCateloriManagement />} adminOnly={false} />} />
      <Route path="/DiscountManagement" element={<ProtectedRoute element={<DiscountManagement />} adminOnly={false} />} />
      <Route path="/StatisticsManagement" element={<ProtectedRoute element={<StatisticsManagement />} adminOnly={false} />} />
    </Routes>
</main>
</div>
  );
};
export default AdminApp;
