import { useState, useEffect } from 'react';
import axios from 'axios';

const useOrders = () => {
    const [orders, setOrders] = useState([]); 
    const [order, setOrder] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [orderLoading, setOrderLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [orderError, setOrderError] = useState(null); 
    const [actionLoading, setActionLoading] = useState(false); 
    const [actionError, setActionError] = useState(null); 

    // Lấy tất cả đơn hàng
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:8081/orders');
                setOrders(response.data);
            } catch (err) {
                setError('Đã xảy ra lỗi khi kết nối với server');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Lấy đơn hàng theo ID
    const fetchOrderById = async (id) => {
        setOrderLoading(true);
        setOrderError(null);
        try {
            const response = await axios.get(`http://localhost:8081/orders/${id}`);
            setOrder(response.data);
        } catch (err) {
            setOrderError('Đơn hàng không tồn tại.');
        } finally {
            setOrderLoading(false);
        }
    };

    // Thêm đơn hàng
    const addOrder = async (newOrder) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.post('http://localhost:8081/orders', newOrder);
            setOrders((prevOrders) => [...prevOrders, response.data]);
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi thêm đơn hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    // Xóa đơn hàng
    const deleteOrderById = async (id) => {
        setActionLoading(true);
        setActionError(null);
        try {
            await axios.delete(`http://localhost:8081/orders/${id}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi xóa đơn hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    // Sửa đơn hàng
    const updateOrderById = async (id, updatedFields) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.put(`http://localhost:8081/orders/${id}`, updatedFields);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, ...response.data } : order
                )
            );
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi sửa đơn hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    // Cập nhật trạng thái đơn hàng
    const updateOrderStatus = async (id, status) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.put(`http://localhost:8081/orders/${id}/status`, { status });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, status: response.data.status } : order
                )
            );
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.');
        } finally {
            setActionLoading(false);
        }
    };

    return {
        orders,
        order,
        loading,
        orderLoading,
        error,
        orderError,
        actionLoading,
        actionError,
        fetchOrderById,
        addOrder,
        deleteOrderById,
        updateOrderById,
        updateOrderStatus, 
    };
};

export default useOrders;
