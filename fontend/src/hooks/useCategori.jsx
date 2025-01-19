import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy tất cả danh mục sản phẩm
    const getCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8081/categories");
            const categoriesArray = Object.values(response.data); 
            setCategories(categoriesArray); 
        } catch (err) {
            setError("Có lỗi xảy ra khi lấy danh mục");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Thêm danh mục sản phẩm
    const addCategory = async (category) => {
        try {
            const response = await axios.post('http://localhost:8081/categories', category);
            setCategories([...categories, response.data.data]);
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm danh mục');
            console.error(err);
        }
    };

    // Cập nhật danh mục sản phẩm
    const updateCategory = async (categoryId, updatedFields) => {
        try {
            const response = await axios.put(`http://localhost:8081/categories/${categoryId}`, updatedFields);
            setCategories(categories.map(category =>
                category.id === categoryId ? { ...category, ...updatedFields } : category
            ));
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật danh mục');
            console.error(err);
        }
    };

    // Xóa danh mục sản phẩm
    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8081/categories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa danh mục');
            console.error(err);
        }
    };

    useEffect(() => {
        getCategories();
    }, []); 

    return {
        categories,
        loading,
        error,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    };
};

export default useCategories;
