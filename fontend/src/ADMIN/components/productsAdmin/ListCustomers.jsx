import React, { useState } from 'react';
import useCustomers from '../../../hooks/useCustomers';

const ListCustomers = () => {
    const {
        customers,
        addCustomer,
        deleteCustomerById,
        updateCustomerById,
        actionLoading,
        actionError,
    } = useCustomers();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const customersPerPage = 7;
    const totalCustomers = customers.length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            try {
                await updateCustomerById(editingCustomerId, formData);
                alert('Thông tin khách hàng đã được cập nhật!');
                window.location.reload();
            } catch (error) {
                console.error(actionError);
            } finally {
                closeModal();
            }
        } else {
            try {
                await addCustomer(formData);
                alert('Khách hàng mới đã được thêm thành công!');
                window.location.reload();
            } catch (error) {
                console.error(actionError);
            } finally {
                closeModal();
            }
        }
    };

    const handleEditCustomer = (customer) => {
        setIsEditing(true);
        setEditingCustomerId(customer.id);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
        });
        setIsModalOpen(true);
    };

    const handleDeleteCustomer = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa khách hàng này?')) {
            try {
                await deleteCustomerById(id);
                alert('Khách hàng đã được xóa thành công!');
                window.location.reload();
            } catch (error) {
                console.error(actionError);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingCustomerId(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
        });
    };

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between mb-4">
                <button
                    onClick={openModal}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Thêm Khách Hàng</span>
                </button>

                {/* Search Filter */}
                <div className="ml-4 flex-grow relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên khách hàng..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-400"
                    />

                    {/* Search Icon (Heroicons) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-800 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M19 10a7 7 0 10-7 7 7 7 0 007-7z"
                        />
                    </svg>
                </div>

            </div>

            {/* Conditional Display: Table or No Customers */}
            {filteredCustomers.length === 0 ? (
                <p className="text-center text-gray-600">Chưa có khách hàng nào.</p>
            ) : (
                <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg uppercase">
                            <th className="px-6 py-2 border-b">Tên</th>
                            <th className="px-6 py-2 border-b">Email</th>
                            <th className="px-6 py-2 border-b">Số điện thoại</th>
                            <th className="px-6 py-2 border-b">Địa chỉ</th>
                            <th className="px-6 py-2 border-b">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 border-b text-gray-700">{customer.name}</td>
                                <td className="px-6 py-3 border-b text-gray-700">{customer.email}</td>
                                <td className="px-6 py-3 border-b text-gray-700">{customer.phone}</td>
                                <td className="px-6 py-3 border-b text-gray-700">{customer.address}</td>
                                <td className="px-6 py-3 border-b flex space-x-4 justify-center">
                                    {/* Edit Button with Icon */}
                                    <button
                                        onClick={() => handleEditCustomer(customer)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-300 flex items-center space-x-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 4.121l5.657 5.657-2.828 2.828-5.657-5.657 2.828-2.828zM18.364 4.121a2.828 2.828 0 114.0 4 2.828 2.828 0 01-4.0-4zM3 17.25V21h3.75l10.688-10.688-3.75-3.75L3 17.25z" />
                                        </svg>
                                        <span>Sửa</span>
                                    </button>
                                    {/* Delete Button with Icon */}
                                    <button
                                        onClick={() => handleDeleteCustomer(customer.id)}
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
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-4 mt-4">
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => paginate(pageNumber + 1)}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === pageNumber + 1 ? 'bg-blue-600' : 'hover:bg-blue-600'} transition duration-300`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full sm:w-96 shadow-2xl transform transition-all duration-300 ease-out scale-95 hover:scale-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center uppercase">{isEditing ? 'Sửa Khách Hàng' : 'Thêm Khách Hàng'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-400 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-400 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-400 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ:</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-400 transition duration-200"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
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

export default ListCustomers;
