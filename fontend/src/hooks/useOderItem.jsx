import { useState, useEffect } from 'react';
import axios from 'axios';

const useOrders = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    // Lấy danh sách order_items
    const fetchOrderItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/order_items');
            setOrderItems(response.data);
        } catch (err) {
            setError('Đã xảy ra lỗi khi lấy danh sách order_items.');
        } finally {
            setLoading(false);
        }
    };

    // Thêm order_item
    const addOrderItem = async (newOrderItem) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.post('http://localhost:8081/order_items', newOrderItem);
            setOrderItems((prevOrderItems) => [...prevOrderItems, response.data]);
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi thêm order_item.');
        } finally {
            setActionLoading(false);
        }
    };

    return {
        orderItems,
        loading,
        error,
        actionLoading,
        actionError,
        fetchOrderItems,
        addOrderItem,
    };
};

export default useOrders;
