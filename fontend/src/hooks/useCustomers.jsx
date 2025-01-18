import { useState, useEffect } from 'react';
import axios from 'axios';

const useCustomers = () => {
    const [customers, setCustomers] = useState([]); 
    const [customer, setCustomer] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [customerLoading, setCustomerLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [customerError, setCustomerError] = useState(null); 
    const [actionLoading, setActionLoading] = useState(false); 
    const [actionError, setActionError] = useState(null); 
    const [emailLoading, setEmailLoading] = useState(false); 
    const [emailError, setEmailError] = useState(null); 
    const [checkEmailLoading, setCheckEmailLoading] = useState(false); 
    const [checkEmailError, setCheckEmailError] = useState(null); 

    // Lấy tất cả khách hàng
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:8081/customers');
                setCustomers(response.data);
            } catch (err) {
                setError('Đã xảy ra lỗi khi kết nối với server');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    // Lấy khách hàng theo ID
    const fetchCustomerById = async (id) => {
        setCustomerLoading(true);
        setCustomerError(null);
        try {
            const response = await axios.get(`http://localhost:8081/customers/${id}`);
            setCustomer(response.data);
        } catch (err) {
            setCustomerError('Khách hàng không tồn tại.');
        } finally {
            setCustomerLoading(false);
        }
    };

    // Lấy khách hàng theo Email
    const fetchCustomerByEmail = async (email) => {
        setEmailLoading(true);
        setEmailError(null);
        try {
            const response = await axios.get(`http://localhost:8081/customers/email/${email}`);
            setCustomer(response.data);
        } catch (err) {
            setEmailError('Khách hàng không tồn tại hoặc đã xảy ra lỗi.');
        } finally {
            setEmailLoading(false);
        }
    };

    const fetchIDCustomerByEmail = async (email) => {
        setEmailLoading(true);
        setEmailError(null);
        try {
            const response = await axios.get(`http://localhost:8081/customers/email/id/${email}`);
            return response.data.id;
        } catch (err) {
            setEmailError('ID khách hàng không tồn tại hoặc đã xảy ra lỗi.');
            return null;
        } finally {
            setEmailLoading(false);
        }
    };

    // Kiểm tra email tồn tại
    const checkEmailExists = async (email) => {
        try {
          const response = await axios.get(`http://localhost:8081/customers/check-email/${email}`);
          
          if (response.status === 200 && response.data.message === "Email đã tồn tại") {
            return true;
          }
      
          return false;
        } catch (error) {
          console.error('Lỗi khi kiểm tra email:', error);
          return false;
        }
      };

    // Thêm khách hàng
    const addCustomer = async (newCustomer) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.post('http://localhost:8081/customers', newCustomer);
            setCustomers((prevCustomers) => [...prevCustomers, response.data]);
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi thêm khách hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    // Xóa khách hàng
    const deleteCustomerById = async (id) => {
        setActionLoading(true);
        setActionError(null);
        try {
            await axios.delete(`http://localhost:8081/customers/${id}`);
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi xóa khách hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    // Sửa thông tin khách hàng
    const updateCustomerById = async (id, updatedFields) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.put(`http://localhost:8081/customers/${id}`, updatedFields);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === id ? { ...customer, ...response.data } : customer
                )
            );
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi sửa thông tin khách hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    return {
        customers,
        customer,
        loading,
        customerLoading,
        error,
        customerError,
        actionLoading,
        actionError,
        emailLoading,
        emailError,
        checkEmailLoading,
        checkEmailError,
        fetchCustomerById,
        fetchCustomerByEmail,
        fetchIDCustomerByEmail,
        addCustomer,
        deleteCustomerById,
        updateCustomerById,
        checkEmailExists, 
    };
};

export default useCustomers;
