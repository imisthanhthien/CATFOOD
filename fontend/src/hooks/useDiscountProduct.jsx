import { useState, useEffect } from 'react';
import axios from 'axios';

const useDiscountProduct = () => {
    const [discountProductMaps, setDiscountProductMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy tất cả mối quan hệ giảm giá và sản phẩm
    const getAllDiscountProductMaps = async () => {
        try {
            const response = await axios.get('http://localhost:8081/discount-products');
            setDiscountProductMaps(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Lỗi khi lấy mối quan hệ giảm giá và sản phẩm:', err);
            setError('Lỗi khi lấy dữ liệu');
            setLoading(false);
        }
    };

    // Lấy mối quan hệ giữa giảm giá và sản phẩm theo discount_id
    const getProductsByDiscountId = async (discountId) => {
        try {
            const response = await axios.get(`http://localhost:8081/discount-products/discounts/${discountId}`);
            if (response.data && response.data.length > 0) {
                return response.data[0].discount_value;
            }
        } catch (err) {
            console.error('Lỗi khi lấy giảm giá:', err);
        }
    };

    // Lấy mối quan hệ giữa giảm giá và sản phẩm theo product_id
    const getDiscountsByProductId = (productId) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8081/discount-products/products/${productId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    console.error('Lỗi khi lấy giảm giá theo product_id:', err);
                    reject('Lỗi khi lấy dữ liệu');
                });
        });
    };
    //Thêm mối quan hệ giảm giá vào sản phẩm
    const addDiscountProductMapping = async (discountId, productId) => {
        if (!discountId || !productId) {
            console.error('Giảm giá hoặc sản phẩm không hợp lệ:', discountId, productId);
            setError('Vui lòng cung cấp đầy đủ thông tin giảm giá và sản phẩm.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/discount-products', {
                discount_id: discountId,
                product_id: productId
            });
            return response.data;
        } catch (err) {
            console.error('Lỗi khi thêm mối quan hệ giảm giá và sản phẩm:', err);
            if (err.response) {
                console.error('Lỗi từ API:', err.response.data);
                setError(`Lỗi: ${err.response.data.error || 'Không xác định'}`);
                if (err.response.data.details) {
                    console.error('Chi tiết lỗi:', err.response.data.details);
                }
            } else {
                setError('Lỗi kết nối với API. Vui lòng thử lại.');
            }
        }
    };

    // Xóa mối quan hệ giảm giá và sản phẩm
    const deleteDiscountProductMapping = async (discountId, productId) => {
        try {
            const response = await axios.delete(`http://localhost:8081/discount-products/discount/${discountId}/product/${productId}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi xóa mối quan hệ giảm giá và sản phẩm:', err);
            setError('Lỗi khi xóa dữ liệu');
        }
    };

    // Kiểm tra sản phẩm có giảm giá hay không
    const checkProductDiscount = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8081/discount-products/check-product/${productId}`);
            return response.data.isDiscounted === 1; 
        } catch (err) {
            console.error('Lỗi khi kiểm tra sản phẩm có giảm giá:', err);
            setError('Lỗi khi kiểm tra giảm giá');
            return false;
        }
    };

    // Lấy discount_id theo product_id
    const getDiscountIdByProductId = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8081/discount-products/discount-id/${productId}`);
            console.log("API Response:", response);

            if (response.data && response.data.discountId) {
                return [response.data.discountId];
            }
            return [];
        } catch (err) {
            console.error('Lỗi khi lấy discount_id theo product_id:', err);
            setError('Lỗi khi lấy discount_id');
            return [];
        }
    };

    const checkDiscountExists = async (discountId) => {
        try {
            const response = await axios.get(`http://localhost:8081/discount-products/check-discount/${discountId}`);
            return response.data.exists === 1; 
        } catch (error) {
            console.error('Lỗi khi kiểm tra discount_id:', error);
            return false;  
        }
    };


    useEffect(() => {
        getAllDiscountProductMaps();
    }, []);

    return {
        discountProductMaps,
        loading,
        error,
        getProductsByDiscountId,
        getDiscountsByProductId,
        addDiscountProductMapping,
        deleteDiscountProductMapping,
        checkProductDiscount,
        getDiscountIdByProductId,
        checkDiscountExists
    };
};

export default useDiscountProduct;
