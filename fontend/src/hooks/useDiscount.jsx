import { useState, useEffect } from 'react';
import axios from 'axios';

const useDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy tất cả các giảm giá
    const getAllDiscounts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/discounts'); // URL đầy đủ
            setDiscounts(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Lấy giảm giá theo mã
    const getDiscountByCode = async (code) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/discounts/code/${code}`); // URL đầy đủ
            setDiscount(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Thêm mới giảm giá
    const addDiscount = async (discountData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/discounts', discountData); // URL đầy đủ
            setDiscounts((prevDiscounts) => [...prevDiscounts, response.data]);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Cập nhật giảm giá theo ID
    const updateDiscount = async (id, updatedFields) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8081/discounts/${id}`, updatedFields); // URL đầy đủ
            setDiscounts((prevDiscounts) => 
                prevDiscounts.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
            );
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Xóa giảm giá theo ID
    const deleteDiscount = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8081/discounts/${id}`); // URL đầy đủ
            setDiscounts((prevDiscounts) => prevDiscounts.filter((d) => d.id !== id));
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDiscounts(); // Lấy tất cả các giảm giá khi hook được khởi tạo
    }, []);

    return {
        discounts,
        discount,
        loading,
        error,
        getAllDiscounts,
        getDiscountByCode,
        addDiscount,
        updateDiscount,
        deleteDiscount
    };
};

export default useDiscount;
