import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook dùng để lấy mối quan hệ giữa giảm giá và đơn hàng
const useOrderDiscount = () => {
    const [orderDiscountMaps, setOrderDiscountMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy tất cả mối quan hệ giảm giá và đơn hàng
    const getAllOrderDiscountMaps = async () => {
        try {
            const response = await axios.get('http://localhost:8081/order-discount-maps');
            setOrderDiscountMaps(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Lỗi khi lấy mối quan hệ giảm giá và đơn hàng:', err);
            setError('Lỗi khi lấy dữ liệu');
            setLoading(false);
        }
    };

    // Lấy mối quan hệ giữa giảm giá và đơn hàng theo order_id
    const getDiscountsByOrderId = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8081/order-discount-maps/orders/${orderId}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi lấy giảm giá theo order_id:', err);
            setError('Lỗi khi lấy dữ liệu');
        }
    };

    // Lấy mối quan hệ giữa giảm giá và đơn hàng theo discount_id
    const getOrdersByDiscountId = async (discountId) => {
        try {
            const response = await axios.get(`http://localhost:8081/order-discount-maps/discounts/${discountId}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi lấy đơn hàng theo discount_id:', err);
            setError('Lỗi khi lấy dữ liệu');
        }
    };

    // Thêm mối quan hệ giảm giá và đơn hàng
    const addOrderDiscountMapping = async (orderId, discountId) => {
        try {
            const response = await axios.post('http://localhost:8081/order-discount-maps', { orderId, discountId });
            return response.data;
        } catch (err) {
            console.error('Lỗi khi thêm mối quan hệ giảm giá và đơn hàng:', err);
            setError('Lỗi khi thêm dữ liệu');
        }
    };

    // Xóa mối quan hệ giảm giá và đơn hàng
    const deleteOrderDiscountMapping = async (orderId, discountId) => {
        try {
            const response = await axios.delete(`http://localhost:8081/order-discount-maps/order/${orderId}/discount/${discountId}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi xóa mối quan hệ giảm giá và đơn hàng:', err);
            setError('Lỗi khi xóa dữ liệu');
        }
    };

    useEffect(() => {
        getAllOrderDiscountMaps();
    }, []);

    return {
        orderDiscountMaps,
        loading,
        error,
        getDiscountsByOrderId,
        getOrdersByDiscountId,
        addOrderDiscountMapping,
        deleteOrderDiscountMapping
    };
};

export default useOrderDiscount;
