import React, { useEffect, useState } from "react";
import useVoucherCustomer from "../hooks/useVoucherCustomer";
import useCustomers from "../hooks/useCustomers";

const CustomerInfoDialog = ({ customer, onClose }) => {
    const { voucherCustomers, loading, error } = useVoucherCustomer(customer?.id);
    const { updateCustomerById } = useCustomers();
    const [formData, setFormData] = useState({
        name: customer?.name || '',
        phone: customer?.phone || '',
        address: customer?.address || '',
        email: customer?.email || '',
    });
    const [hasFetched, setHasFetched] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log("Customer ID:", customer?.id);
        if (customer?.id && !hasFetched) {
            console.log("Fetching vouchers for customer:", customer.id);
            setHasFetched(true); // Đánh dấu đã tải dữ liệu
        }
    }, [customer?.id, hasFetched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cập nhật thông tin khách hàng
        const updatedFields = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
        };
        await updateCustomerById(customer.id, updatedFields);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 2000);

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-4xl">
                <h2 className="text-md font-medium w-full text-white mb-4 p-2 bg-blue-400 rounded-lg shadow-lg 
              relative overflow-hidden justify-center text-center uppercase">Thông tin khách hàng</h2>
                {customer ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            {customer.name && (
                                <div className="mb-4">
                                    <label className="text-sm mb-2 block text-gray-700">Tên:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                                    />
                                </div>
                            )}

                            <div className="mb-4 flex space-x-4">
                                {/* Email */}
                                <div className="w-1/2">
                                    <label className="text-sm mb-2 block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed text-sm"
                                    />
                                </div>

                                {/* Số điện thoại */}
                                {customer.phone && customer.phone !== '0' && (
                                    <div className="w-1/2">
                                        <label className="text-sm mb-2 block text-gray-700">Số điện thoại:</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            {customer.address && (
                                <div className="mb-4">
                                    <label className="text-sm mb-2 block text-gray-700">Địa chỉ:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-20 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm absolute top-[95px]"
                                >
                                    Cập nhật
                                </button>
                            </div>

                            {showSuccessMessage && (
                                <div
                                    className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-md text-sm"
                                >
                                    Cập nhật thành công!
                                </div>
                            )}
                        </form>


                        <div>
                            <h3 className="text-sm font-medium w-full text-white mb-4 p-2 bg-blue-400 rounded-lg shadow-lg 
              relative overflow-hidden justify-center text-center uppercase">
                                Danh sách Voucher của bạn
                            </h3>

                            {/* Hiển thị trạng thái loading và error */}
                            {loading ? (
                                <p className="text-center text-gray-500">Đang tải voucher...</p>
                            ) : error ? (
                                <p className="text-red-500 text-center">{error}</p>
                            ) : (
                                <div className="overflow-x-auto max-w-full h-60">
                                    <div className="grid grid-cols-2 gap-4">
                                        {voucherCustomers.length > 0 ? (
                                            voucherCustomers
                                                .filter((voucher) => voucher.status_cus !== "used")
                                                .map((voucher) => (
                                                    <div
                                                        key={voucher.voucher_id}
                                                        className="flex p-3 border border-orange-500 rounded-lg shadow-sm hover:shadow-md transform transition-all duration-300 ease-in-out bg-white"
                                                    >
                                                        <div className="w-1/3 bg-orange-500 text-white flex items-center justify-center p-2">
                                                            <p className="text-sm font-semibold">{voucher.code}</p>
                                                        </div>

                                                        <div className="w-2/3 p-2">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span
                                                                    className={`absolute right-3 text-xs px-2 py-1 rounded-full ${voucher.status === "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}
                                                                >
                                                                    {voucher.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
                                                                </span>
                                                            </div>

                                                            <p className="text-xs text-gray-700 mb-1">
                                                                Giảm:{" "}
                                                                <span className="font-semibold">
                                                                    {voucher.discount_percentage > 0
                                                                        ? `${voucher.discount_percentage}%`
                                                                        : `${new Intl.NumberFormat().format(voucher.discount_amount)} VNĐ`}
                                                                </span>
                                                            </p>

                                                            {voucher.min_order_amount && (
                                                                <p className="text-xs text-gray-500 mb-1">
                                                                    Đơn tối thiểu: <span className="font-semibold">{new Intl.NumberFormat().format(voucher.min_order_amount)} VNĐ</span>
                                                                </p>
                                                            )}

                                                            {voucher.max_discount_amount && (
                                                                <p className="text-xs text-gray-500 mb-1">
                                                                    {voucher.discount_percentage > 0 && (
                                                                        <span>
                                                                            Số tiền giảm tối đa: <span className="font-semibold">{new Intl.NumberFormat().format(voucher.max_discount_amount)} VNĐ</span>
                                                                        </span>
                                                                    )}
                                                                </p>
                                                            )}

                                                            {voucher.expiration_date && (
                                                                <p className="text-xs text-gray-500 mb-1">
                                                                    Hạn dùng:{" "}
                                                                    <span className="font-semibold">{new Date(voucher.expiration_date).toLocaleDateString()}</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="text-center text-gray-500">Không có voucher nào.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy thông tin khách hàng.</p>
                )}

<div className="relative">
    <button
        onClick={onClose}
        className="text-center justify-center mt-6 w-8 h-8 px-2 py-1 bg-red-400 text-white  hover:bg-gray-300 transition-all absolute right-[-32px] top-[-650px]"
    >
        X
    </button>
</div>

            </div>
        </div>
    );
};

export default CustomerInfoDialog;
