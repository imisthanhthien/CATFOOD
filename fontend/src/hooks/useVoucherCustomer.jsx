import { useState, useEffect } from 'react';
import axios from 'axios';

const useVoucherCustomer = (customerId) => {
  const [voucherCustomers, setVoucherCustomers] = useState([]); // Trạng thái lưu danh sách voucher của khách hàng
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [status, setStatus] = useState(null); // Định nghĩa setStatus ở đây
  // Lấy tất cả các voucher của khách hàng
  const getAllVouchersByCustomer = async (customerId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/voucher-customers/${customerId}`);
      console.log("Voucher Data:", response.data); // Thêm log để kiểm tra dữ liệu
      setVoucherCustomers(response.data);
      setError(null);
    } catch (err) {
      setError('Lỗi khi lấy danh sách voucher của khách hàng!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Thêm voucher cho khách hàng
  const addVoucherToCustomer = async (customerId, voucherId) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/voucher-customers', { customerId, voucherId });
      setVoucherCustomers((prevVoucherCustomers) => [...prevVoucherCustomers, response.data]);
      setError(null);
    } catch (err) {
      setError('Lỗi khi thêm voucher cho khách hàng!');
    } finally {
      setLoading(false);
    }
  };

  // Xóa voucher của khách hàng
  const removeVoucherFromCustomer = async (customerId, voucherId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8081/voucher-customers/${customerId}/${voucherId}`);
      setVoucherCustomers((prevVoucherCustomers) =>
        prevVoucherCustomers.filter((voucher) => voucher.voucher_id !== voucherId)
      );
      setError(null);
    } catch (err) {
      setError('Lỗi khi xóa voucher của khách hàng!');
    } finally {
      setLoading(false);
    }
  };

  // Thêm voucher cho tất cả khách hàng
  const addVoucherToAllCustomers = async (voucherCode) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/voucher-customers/add-voucher-to-all', { voucherCode });
      setError(null);
      return response.data;
    } catch (err) {
      setError('Lỗi khi thêm voucher cho tất cả khách hàng!');
    } finally {
      setLoading(false);
    }
  };

  const updateVoucherStatus = async (customerId, voucherCode) => {
    setLoading(true);
    try {
      // Kiểm tra nếu customerId hoặc voucherCode không hợp lệ
      if (!customerId || !voucherCode) {
        setError('Customer ID hoặc Voucher Code không hợp lệ!');
        setLoading(false);
        return;
      }
  
      const response = await axios.put(`http://localhost:8081/voucher-customers/update-status/${customerId}/${voucherCode}`);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Lỗi khi cập nhật trạng thái voucher!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const checkVoucherStatus = async (customerId, voucherCode) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/voucher-customers/check-status/${customerId}/${voucherCode}`
      );
  
      // Kiểm tra response.status
      if (response.data.status === 1) {
        return 'used'; // Voucher đã được sử dụng
      } else {
        return 'unused'; // Voucher chưa được sử dụng
      }
    } catch (err) {
      setError('Lỗi khi kiểm tra trạng thái voucher!');
      setStatus('unused'); // Nếu có lỗi, mặc định là 'unused'
      console.error(err);
      return 'unused'; // Trả về trạng thái mặc định nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  // Hook gọi lại getAllVouchersByCustomer khi component được mount
  useEffect(() => {
    if (customerId) {
      getAllVouchersByCustomer(customerId);
    }
  }, [customerId]);

  return {
    voucherCustomers,
    loading,
    error,
    getAllVouchersByCustomer,
    addVoucherToCustomer,
    removeVoucherFromCustomer,
    addVoucherToAllCustomers,
    updateVoucherStatus, // Đảm bảo hàm này được trả về
    checkVoucherStatus,

  };
};

export default useVoucherCustomer;
