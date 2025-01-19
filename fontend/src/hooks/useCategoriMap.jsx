import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategoryMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy tất cả các bản ghi
  const fetchAllCategoryMaps = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/category-map/');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Lấy danh mục sản phẩm từ mã sản phẩm
  const getCategoriesByProductId = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8081/category-map/product/${productId}`);
       
        return response.data[0]?.id; 
    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        throw error;
    }
};

  // Lấy sản phẩm theo categoryId
  const getProductsByCategoryId = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/category-map/category/${categoryId}`);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm mối quan hệ mới
  const addCategoryMapping = async (productId, categoryId) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/category-map/', { productId, categoryId });
      setData((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa mối quan hệ
  const deleteCategoryMapping = async (productId, categoryId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8081/category-map/product/${productId}/category/${categoryId}`, {
        data: { productId, categoryId },
      });
      setData((prevData) =>
        prevData.filter(
          (map) => !(map.product_id === productId && map.category_id === categoryId)
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  //Update loại sản phẩm và danh mục sản phẩm
  const updateCategoryMapping = async (productId, newCategoryId) => {
    setLoading(true);
    try {
      const response = await axios.put('http://localhost:8081/category-map/update', { productId, newCategoryId });
      setData((prevData) =>
        prevData.map((map) =>
          map.product_id === productId
            ? { ...map, category_id: newCategoryId }
            : map
        )
      );
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};

  useEffect(() => {
    fetchAllCategoryMaps();
  }, []);

  return {
    data,
    loading,
    error,
    getCategoriesByProductId,
    getProductsByCategoryId,
    addCategoryMapping,
    deleteCategoryMapping,
    updateCategoryMapping,
  };
};

export default useCategoryMap;
