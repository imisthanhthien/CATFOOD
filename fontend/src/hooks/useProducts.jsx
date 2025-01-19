import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
    const [products, setProducts] = useState([]); 
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [productLoading, setProductLoading] = useState(false); 
    const [quantity, setQuantity] = useState(null);
    const [error, setError] = useState(null); 
    const [productError, setProductError] = useState(null); 
    const [actionLoading, setActionLoading] = useState(false); 
    const [actionError, setActionError] = useState(null); 

    // Lấy tất cả sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
            } catch (err) {
                setError('Đã xảy ra lỗi khi kết nối với server');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Lấy sản phẩm theo ID
    const fetchProductById = async (id) => {
        setProductLoading(true);
        setProductError(null);
        try {
            const response = await axios.get(`http://localhost:8081/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setProductError('Sản phẩm không tồn tại.');
        } finally {
            setProductLoading(false);
        }
    };

    const fetchProductByIdCart = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8081/products/${productId}`);
            console.log("Fetched product:", response.data); 
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            return null; 
        }
    };

    // Lấy số lượng sản phẩm theo ID
    const fetchProductQuantityById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/products/quantity/${id}`);
            return response.data; 
        } catch (err) {
            console.error('Không thể lấy số lượng sản phẩm:', err);
            throw new Error('Không thể lấy số lượng sản phẩm.');
        }
    };

    // Thêm sản phẩm
    const addProduct = async (newProduct) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.post('http://localhost:8081/products', newProduct);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            return response.data;
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi thêm sản phẩm.');
            throw err; 
        } finally {
            setActionLoading(false);
        }
    };

    // Xóa sản phẩm
    const deleteProductById = async (id) => {
        setActionLoading(true);
        setActionError(null);
        try {
            await axios.delete(`http://localhost:8081/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi xóa sản phẩm.');
        } finally {
            setActionLoading(false);
        }
    };

    // Sửa sản phẩm
    const updateProductById = async (id, updatedFields) => {
        setActionLoading(true);
        setActionError(null);
        try {
            const response = await axios.put(`http://localhost:8081/products/${id}`, updatedFields);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, ...response.data } : product
                )
            );
        } catch (err) {
            setActionError('Đã xảy ra lỗi khi sửa sản phẩm.');
        } finally {
            setActionLoading(false);
        }
    };

    return {
        products,
        product,
        quantity, 
        loading,
        productLoading,
        error,
        productError,
        actionLoading,
        actionError,
        fetchProductById,
        fetchProductQuantityById, 
        addProduct,
        deleteProductById,
        updateProductById,
        fetchProductByIdCart
    };
};

export default useProducts;
