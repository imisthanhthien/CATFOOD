import React, { useState } from 'react';
import useVouchers from '../../../hooks/useVouchers';

const ListVouchers = () => {
    const {
        vouchers,
        loading,
        error,
        addVoucher,
        updateVoucher,
        deleteVoucher,
    } = useVouchers();

    const [formData, setFormData] = useState({
        code: '',
        discount_percentage: '',
        discount_amount: '',
        min_order_amount: '',
        expiration_date: '',
        status: '',
        max_discount_amount: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingVoucherId, setEditingVoucherId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const formatDateForInput = (date) => {
        if (!date) return '';
        const vnDate = new Date(date);
        const year = vnDate.getFullYear();
        const month = String(vnDate.getMonth() + 1).padStart(2, '0');
        const day = String(vnDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const formattedData = {
                ...formData,
            };
    
            if (isEditing) {
                await updateVoucher(editingVoucherId, formattedData);
                alert('Voucher đã được cập nhật!');
                window.location.reload();
            } else {
                await addVoucher(formattedData);
                alert('Voucher mới đã được thêm thành công!');
                window.location.reload();
            }
            closeModal();
        } catch (error) {
            console.error(error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };
    
    const handleEditVoucher = (voucher) => {
        setIsEditing(true);
        setEditingVoucherId(voucher.id);
        setFormData({
            code: voucher.code,
            discount_percentage: voucher.discount_percentage,
            discount_amount: voucher.discount_amount,
            min_order_amount: voucher.min_order_amount,
            expiration_date: formatDateForInput(voucher.expiration_date),
            status: voucher.status,
            max_discount_amount: voucher.max_discount_amount || '',  // Đảm bảo có giá trị mặc định nếu không có giá trị
        });
        setIsModalOpen(true);
    };
    

    const handleDeleteVoucher = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa voucher này?')) {
            try {
                await deleteVoucher(id);
                alert('Voucher đã được xóa thành công!');
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert('Lỗi khi xóa voucher!');
            }
        }
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingVoucherId(null);
        setFormData({
            code: '',
            discount_percentage: '',
            discount_amount: '',
            min_order_amount: '',
            expiration_date: '',
            status: '',
            max_discount_amount: '', 
        });
    };

    return (
        <div className="p-6 space-y-6">
            {loading && <div>Đang tải...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-between mb-4">
                <button
                    onClick={openModal}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Thêm Voucher</span>
                </button>
            </div>

            {vouchers.length > 0 ? (
                <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg uppercase">
                            <th className="px-6 py-2 border-b">Mã Voucher</th>
                            <th className="px-6 py-2 border-b">Giảm (%)</th>
                            <th className="px-6 py-2 border-b">Giảm (VNĐ)</th>
                            <th className="px-6 py-2 border-b">Giá trị đơn hàng tối thiểu</th>
                            <th className="px-6 py-2 border-b">Giảm tối đa (VNĐ)</th>
                            <th className="px-6 py-2 border-b">Ngày hết hạn</th>
                            <th className="px-6 py-2 border-b">Trạng thái</th>
                            <th className="px-6 py-2 border-b">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id} className="hover:bg-gray-50">
                                
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.code}</td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.discount_percentage}%</td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.discount_amount} VNĐ</td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.min_order_amount} VNĐ</td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.max_discount_amount} </td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.expiration_date}</td>
                                <td className="px-6 py-3 border-b text-gray-700">{voucher.status}</td>

                                <td className="px-6 py-3 border-b flex space-x-4 justify-center">
                                    <button
                                        onClick={() => handleEditVoucher(voucher)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-300 flex items-center space-x-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 4.121l5.657 5.657-2.828 2.828-5.657-5.657 2.828-2.828zM18.364 4.121a2.828 2.828 0 114.0 4 2.828 2.828 0 01-4.0-4zM3 17.25V21h3.75l10.688-10.688-3.75-3.75L3 17.25z" />
                                        </svg>
                                        <span>Sửa</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteVoucher(voucher.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300 flex items-center space-x-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span>Xóa</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Không có voucher nào.</div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-96 rounded-lg shadow-lg p-6 space-y-4">
                        <h2 className="text-xl font-bold">{isEditing ? 'Cập nhật Voucher' : 'Thêm Voucher'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Mã Voucher:</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Giảm (%):</label>
                                <input
                                    type="number"
                                    name="discount_percentage"
                                    value={formData.discount_percentage}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Giảm (VNĐ):</label>
                                <input
                                    type="number"
                                    name="discount_amount"
                                    value={formData.discount_amount}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Giá trị đơn hàng tối thiểu:</label>
                                <input
                                    type="number"
                                    name="min_order_amount"
                                    value={formData.min_order_amount}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Giảm tối đa (VNĐ):</label>
                                <input
                                    type="number"
                                    name="max_discount_amount"
                                    value={formData.max_discount_amount}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Ngày hết hạn:</label>
                                <input
                                    type="date"
                                    name="expiration_date"
                                    value={formData.expiration_date}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Trạng thái:</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                    required
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListVouchers;
