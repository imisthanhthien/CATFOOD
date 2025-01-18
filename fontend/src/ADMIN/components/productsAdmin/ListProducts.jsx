import React, { useState, useEffect } from 'react';
import useProducts from '../../../hooks/useProducts';
import useCategoryMap from '../../../hooks/useCategoriMap';
import useCategories from '../../../hooks/useCategori';

const ListProducts = () => {
    const { 
        products, 
        addProduct, 
        deleteProductById, 
        updateProductById, 
        actionLoading, 
        actionError 
    } = useProducts(); 

    const {data, 
      getCategoriesByProductId,
      getProductsByCategoryId,
      addCategoryMapping,
      deleteCategoryMapping,
      updateCategoryMapping,
    } = useCategoryMap();
    const { categories, loading: categoriesLoading, error: categoriesError, getCategories } = useCategories();

    useEffect(() => {
      getCategories();
  }, []);


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
        categoryId: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingCategoriID, seteditingCategoriID] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    // Cập nhật giá trị form khi người dùng nhập
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0]; 
            setFormData({
                ...formData,
                [name]: file, // Lưu trực tiếp đối tượng file thay vì tên file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile);
    
        console.log("Gửi ảnh lên server:", imageFile);
    
        try {
            const response = await fetch('http://localhost:8081/upload', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Dữ liệu trả về từ server:", data);  
                return data.imagePath;  // Trả về đường dẫn ảnh đã upload
            } else {
                const errorText = await response.text();
                console.error("Lỗi khi upload ảnh:", errorText); 
                throw new Error(errorText);
            }
        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);  
            alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.');
            throw error;
        }
    };

    // Xử lý submit khi thêm hoặc sửa sản phẩm
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        quantity: parseInt(formData.quantity),
        image: formData.image,
      };
  
      // Upload ảnh nếu có
      if (formData.image instanceof File) {
          try {
              const imagePath = await uploadImage(formData.image); // Upload ảnh lên server
              newProduct.image = imagePath; // Lưu đường dẫn ảnh trả về từ server
          } catch (error) {
              console.error("Lỗi khi upload ảnh:", error);
              alert("Có lỗi xảy ra khi upload ảnh");
              return; // Nếu lỗi upload ảnh, không tiếp tục xử lý
          }
      } else {
          newProduct.image = formData.image; // Nếu không chọn ảnh, sử dụng đường dẫn ảnh đã có
      }
  
      try {
          if (isEditing) {
             console.log(editingProductId);
             console.log(newProduct);

              await updateProductById(editingProductId, newProduct); // Cập nhật sản phẩm
              await updateCategoryMapping(editingProductId, formData.categoryId);
              alert('Sản phẩm đã được sửa thành công!');
          } else {
              const addedProduct = await addProduct(newProduct); 
              await addCategoryMapping(addedProduct.productId, formData.categoryId); // Thêm mối quan hệ danh mục
              alert('Sản phẩm đã được thêm thành công!');
          }
      } catch (error) {
          console.error("Lỗi trong quá trình xử lý:", error);
          alert("Có lỗi xảy ra khi xử lý yêu cầu.");
      } finally {
          closeModal();
      }
  };
  
  
    // Xử lý sửa sản phẩm
   // Xử lý sửa sản phẩm
   const handleEditProduct = async (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    const categoryId = await getCategoriesByProductId(product.id);
  
    // Cập nhật dữ liệu form
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      image: product.image,
      categoryId: categoryId, // Gửi categoryId vào form
    });
  
    setIsModalOpen(true);
  };
    // Xử lý xóa sản phẩm
    const handleDeleteProduct = async (id) => {
      const categoryId = await getCategoriesByProductId(id);
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            try {

                console.log(categoryId);
                await deleteCategoryMapping(id, categoryId);
                await deleteProductById(id);

                alert('Sản phẩm đã được xóa thành công!');
                window.location.reload(); 
            } catch (error) {
                console.error(actionError);
            }
        }
    };

    // Lấy danh sách sản phẩm theo trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Chuyển sang trang tiếp theo
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Mở modal
    const openModal = () => setIsModalOpen(true);

    // Đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingProductId(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            quantity: '',
            image: '',
        });
    };

    return (
        <div className="min-h-screen">
        
        {/* Nút "Thêm sản phẩm" */}
        <button
  onClick={openModal}
  className="mb-6 px-5 py-2 bg-cyan-400 text-white font-semibold rounded-lg shadow-md  transition transform hover:scale-105 ease-in-out duration-200 flex items-center space-x-3"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  <span>Thêm Sản Phẩm</span>
</button>

      
        {/* Danh sách sản phẩm */}
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Chưa có sản phẩm nào.</p>
        ) : (
          <table className="min-w-full mt-8 table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg uppercase">
                <th className="px-4 py-2 text-left text-sm font-medium">Tên sản phẩm</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Mô tả</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Giá</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Số lượng</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Ảnh</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gradient-to-r from-green-50 to-blue-50 transition-all duration-300 ease-in-out hover:shadow-lg">
                  <td className="px-4 py-4 text-gray-700 text-sm">{product.name}</td>
                  <td className="px-4 py-4 text-gray-600 text-sm">{product.description}</td>
                  <td className="px-4 py-4 text-gray-700 text-sm font-medium">  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                  <td className="px-4 py-4 text-gray-700 text-sm">{product.quantity}</td>
                  <td className="px-4 py-4">
                    <img 
                      src={`http://localhost:8081/${product.image || 'http://localhost:8081/images/ImageProduct/default.jpg'}`} 
                      className="w-16 h-16 object-cover shadow-lg border-2 border-gray-100 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                      alt="Product"
                    />
                  </td>
                  <td className="px-4 py-4 flex space-x-4">
  <button 
    onClick={() => handleEditProduct(product)} 
    className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-110 flex items-center space-x-2 text-sm"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 4.121l5.657 5.657-2.828 2.828-5.657-5.657 2.828-2.828zM18.364 4.121a2.828 2.828 0 114.0 4 2.828 2.828 0 01-4.0-4zM3 17.25V21h3.75l10.688-10.688-3.75-3.75L3 17.25z" />
    </svg>
    <span>Sửa</span>
  </button>

  <button 
    onClick={() => handleDeleteProduct(product.id)} 
    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110 flex items-center space-x-2 text-sm"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span>Xóa</span>
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      
        {/* Phân trang */}
        <div className="mt-8 flex justify-center">
          <ul className="flex list-none space-x-4">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button 
                  onClick={() => paginate(number)} 
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      
        {/* Modal (Form thêm/sửa sản phẩm) */}
        {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-5 rounded-xl shadow-2xl w-2/6 transform transition-all duration-500">
      <h3 className="uppercase text-3xl font-semibold text-gray-800 mb-8 text-center">
        {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Mô tả</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
            required
          />
        </div>
        
        {/* Sử dụng flex để hiển thị giá và số lượng trên cùng một hàng */}
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm">Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm">Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Danh mục sản phẩm</label>
          <select
            name="categoryId"
            value={formData.categoryId} // Giữ giá trị categoryId từ formData
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm">Ảnh sản phẩm</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-cyan-400"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-3 bg-rose-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-sky-400 text-white rounded-lg shadow-md hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            {isEditing ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    );
};

export default ListProducts;
