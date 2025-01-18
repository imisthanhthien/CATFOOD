import React, { useState, useEffect } from 'react';
import useDiscount from '../../../hooks/useDiscount';
import useProducts from '../../../hooks/useProducts';
import useDiscountProduct from '../../../hooks/useDiscountProduct';
const ListDiscounts = () => {
    const {
        discounts,
        addDiscount,
        deleteDiscount,
        updateDiscount,
    
        loading,
        error,
    } = useDiscount();


    const { products } = useProducts();
    const { addDiscountProductMapping, deleteDiscountProductMapping,checkProductDiscount,getDiscountIdByProductId, checkDiscountExists } = useDiscountProduct();

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discount_type: '',
        discount_value: '',
        min_purchase_amount: '',
        start_date: '',
        end_date: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingDiscountId, setEditingDiscountId] = useState(null);
    const [selectedDiscountId, setSelectedDiscountId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);


    const ProductDiscountChecker = ({ productId }) => {
        const [isDiscounted, setIsDiscounted] = useState(null); // State để lưu kết quả kiểm tra giảm giá
    
        useEffect(() => {
            const checkDiscount = async () => {
                const isDiscounted = await checkProductDiscount(productId); // Gọi API hoặc hàm kiểm tra
                setIsDiscounted(isDiscounted); // Cập nhật state
            };
    
            checkDiscount();
        }, [productId]); // Chạy lại mỗi khi productId thay đổi
    
        if (isDiscounted === null) {
            return <td className="px-4 py-2 border-b">Đang kiểm tra...</td>; // Hiển thị khi đang kiểm tra
        }
    
        return (
            <td className="px-4 py-2 border-b">
                {isDiscounted ? 'Đã áp dụng ' : 'Chưa áp dụng '}
            </td>
        );
    };

    const ProductDiscountCheckerB = ({ productId }) => {
        const [isDiscounted, setIsDiscounted] = useState(null); // State để lưu kết quả kiểm tra giảm giá
    
        useEffect(() => {
            const checkDiscount = async () => {
                const isDiscounted = await checkProductDiscount(productId); // Gọi API hoặc hàm kiểm tra
                setIsDiscounted(isDiscounted); // Cập nhật state
            };
    
            checkDiscount();
        }, [productId]); // Chạy lại mỗi khi productId thay đổi
    
        if (isDiscounted === null) {
            return <td className="px-4 py-2 border-b">Đang kiểm tra...</td>; // Hiển thị khi đang kiểm tra
        }
    
        return (
            <td className="px-4 py-2 border-b">
            {isDiscounted ? (
                <button
                    onClick={() => handleRemoveDiscountFromProduct(productId)}
                    className=" flex px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                    Bỏ áp dụng
                </button>
            ) : (
                <button
                    onClick={() => handleApplyDiscountToProduct(productId)}
                    className="flex px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    Áp dụng giảm giá
                </button>
            )}
        </td>
        );
    };
    



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            try {
                await updateDiscount(editingDiscountId, formData);
                alert('Giảm giá đã được cập nhật!');
                window.location.reload();
            } catch (error) {
                console.error(error);
            } finally {
                closeModal();
            }
        } else {
            try {
                await addDiscount(formData);
                alert('Giảm giá mới đã được thêm thành công!');
                window.location.reload();
            } catch (error) {
                console.error(error);
            } finally {
                closeModal();
            }
        }
    };

    const handleEditDiscount = (discount) => {
        setIsEditing(true);
        setEditingDiscountId(discount.id);
        setFormData({
            code: discount.code,
            description: discount.description,
            discount_type: discount.discount_type,
            discount_value: discount.discount_value,
            min_purchase_amount: discount.min_purchase_amount,
            start_date: discount.start_date ? discount.start_date.slice(0, 10) : '',  // Cắt chuỗi để lấy ngày (yyyy-mm-dd)
            end_date: discount.end_date ? discount.end_date.slice(0, 10) : '',        // Cắt chuỗi để lấy ngày (yyyy-mm-dd)
        });
        setIsModalOpen(true);
    };

    const handleDeleteDiscount = async (id) => {
        try {
            // Kiểm tra xem discount có tồn tại không
            const discountExists = await checkDiscountExists(id);
            if (window.confirm('Bạn chắc chắn muốn xóa giảm giá này?')) {

                if (!discountExists) {
                    await deleteDiscount(id);
                    alert('Giảm giá đã được xóa thành công!');
                    window.location.reload();
                }
                else
                    alert('Giảm giá đã áp dụng vui lòng kiểm tra sản phẩm!');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra và xóa giảm giá:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingDiscountId(null);
        setFormData({
            code: '',
            description: '',
            discount_type: '',
            discount_value: '',
            min_purchase_amount: '',
            start_date: '',
            end_date: '',
        });
    };

    const openProductModal = (discountId) => {
        setEditingDiscountId(discountId);
        setSelectedDiscountId(discountId);
        setIsProductModalOpen(true);
    };
    

    const closeProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProductId(null);
    };

const handleApplyDiscountToProduct = async (productId) => {
    try {
        if (!selectedDiscountId) {
            throw new Error('Discount ID không hợp lệ.');
        }
        const result = await addDiscountProductMapping(selectedDiscountId, productId);
        if (result && result.message) {
            alert(result.message); 
            window.location.reload();
            
        } else {
            alert('Không thể áp dụng giảm giá cho sản phẩm.');
        }
    } catch (error) {
        console.error('Lỗi khi áp dụng giảm giá:', error);
        alert('Có lỗi xảy ra khi áp dụng giảm giá!');
    }
};

    const handleRemoveDiscountFromProduct = async (productId) => {
        try {
            const discountIds = await getDiscountIdByProductId(productId);
            if (!discountIds || discountIds.length === 0) {
                alert('Không tìm thấy giảm giá nào cho sản phẩm này.');
                return;
            }
            await deleteDiscountProductMapping(discountIds, productId);
            alert('Giảm giá đã được bỏ áp dụng cho sản phẩm!');
            window.location.reload();
            
        } catch (error) {
            console.error('Lỗi khi bỏ áp dụng giảm giá:', error);
        }
    };

    return (
        <div className="p-6 ">
        <button
    onClick={openModal}
    className="mb-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition duration-300 flex items-center"
>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    <span className="ml-2">Thêm giảm giá</span>
</button>

    
        {discounts.length === 0 ? (
            <p className="text-gray-500">Chưa có giảm giá nào.</p>
        ) : (
            <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
    <thead className="bg-blue-500 text-white text-xs uppercase">
        <tr>
            <th className="px-6 py-3 border-b">Mã giảm </th>
            <th className="px-2 py-3 border-b">Mô tả</th>
            <th className="px-6 py-3 border-b">Loại </th>
            <th className="px-2 py-3 border-b">Giá trị </th>
            <th className="px-1 py-3 border-b">Tối thiểu</th>
            <th className="px-6 py-3 border-b">Bắt đầu</th>
            <th className="px-6 py-3 border-b">Kết thúc</th>
            <th className="px-1 py-3 border-b">Trạng thái</th>
            <th className="px-6 py-3 border-b">Thao tác</th>
        </tr>
    </thead>
    <tbody className="text-xs">
        {discounts.map((discount) => (
            <tr key={discount.id} className="hover:bg-gray-50 transition duration-300">
                <td className="px-6 py-3 border-b">{discount.code}</td>
                <td className="px-6 py-3 border-b">{discount.description}</td>
                <td className="px-6 py-3 border-b">{discount.discount_type}</td>
                <td className="px-6 py-3 border-b">{discount.discount_value}%</td>
                <td className="px-6 py-3 border-b">{discount.min_purchase_amount}</td>
                <td className="px-6 py-3 border-b">{discount.start_date}</td>
                <td className="px-6 py-3 border-b">{discount.end_date}</td>
                <td className="px-6 py-3 border-b">{discount.is_active ? 'Active' : 'Inactive'}</td>
                <td className="px-6 py-3 border-b flex space-x-2">
                    <button
                        onClick={() => handleEditDiscount(discount)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 text-xs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 4.121l5.657 5.657-2.828 2.828-5.657-5.657 2.828-2.828zM18.364 4.121a2.828 2.828 0 114.0 4 2.828 2.828 0 01-4.0-4zM3 17.25V21h3.75l10.688-10.688-3.75-3.75L3 17.25z" />
                        </svg>
                        <span>Sửa</span>
                    </button>
                    <button
                        onClick={() => openProductModal(discount.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 text-xs flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                        <span>Dùng</span>
                    </button>
                    <button
                        onClick={() => handleDeleteDiscount(discount.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-xs flex items-center space-x-1"
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
    
        {/* Modal - Thêm/Sửa Giảm Giá */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-2/6">
              <h3 className="text-xl font-semibold mb-4 text-center uppercase">{isEditing ? 'Sửa Giảm Giá' : 'Thêm Giảm Giá'}</h3>
      
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label htmlFor="code" className="block text-base font-semibold text-gray-700">Mã giảm giá:</label>
                      <input
                          type="text"
                          id="code"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="description" className="block text-base font-semibold text-gray-700">Mô tả:</label>
                      <input
                          type="text"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="discount_type" className="block text-base font-semibold text-gray-700">Loại giảm giá:</label>
                      <input
                          type="text"
                          id="discount_type"
                          name="discount_type"
                          value={formData.discount_type}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="discount_value" className="block text-base font-semibold text-gray-700">Giá trị giảm:</label>
                      <input
                          type="number"
                          id="discount_value"
                          name="discount_value"
                          value={formData.discount_value}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="min_purchase_amount" className="block text-base font-semibold text-gray-700">Số tiền tối thiểu:</label>
                      <input
                          type="number"
                          id="min_purchase_amount"
                          name="min_purchase_amount"
                          value={formData.min_purchase_amount}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>
                  <div className="flex space-x-4">
                      <div className="flex-1">
                          <label htmlFor="start_date" className="block text-base font-semibold text-gray-700">Ngày bắt đầu:</label>
                          <input
                              type="date"
                              id="start_date"
                              name="start_date"
                              value={formData.start_date}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                      </div>
                      <div className="flex-1">
                          <label htmlFor="end_date" className="block text-base font-semibold text-gray-700">Ngày kết thúc:</label>
                          <input
                              type="date"
                              id="end_date"
                              name="end_date"
                              value={formData.end_date}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                      </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                      <button
                          type="button"
                          onClick={closeModal}
                          className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                          Hủy
                      </button>
                      <button
                          type="submit"
                          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                          {isEditing ? 'Cập nhật' : 'Thêm'}
                      </button>
                  </div>
              </form>
          </div>
      </div>
      
       
        )}
    
        {/* Modal - Áp Dụng Giảm Giá */}
        {isProductModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-11/12 max-h-[80vh] overflow-auto">
                    <h3 className="text-2xl font-semibold mb-4 justify-center text-center">DANH SÁCH SẢN PHẨM </h3>
    
                    <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 border-b">Tên sản phẩm</th>
                                <th className="px-4 py-2 border-b">Mô tả</th>
                                <th className="px-4 py-2 border-b">Giá</th>
                                <th className="px-4 py-2 border-b">Số lượng</th>
                                <th className="px-4 py-2 border-b">Ảnh</th>
                                <th className="px-4 py-2 border-b">Trạng thái</th>
                                <th className="px-4 py-2 border-b">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{product.name}</td>
                                    <td className="px-4 py-2 border-b">{product.description}</td>
                                    <td className="px-4 py-2 border-b">{product.price}</td>
                                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                                    <td className="px-4 py-2 border-b">
                                        <img
                                            src={`http://localhost:8081/${product.image || 'images/ImageProduct/default.jpg'}`}
                                            className="w-12 h-12 object-cover"
                                        />
                                    </td>
                                    <ProductDiscountChecker productId={product.id} />
                                    <ProductDiscountCheckerB productId={product.id} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={closeProductModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
    
    );
};

export default ListDiscounts;
