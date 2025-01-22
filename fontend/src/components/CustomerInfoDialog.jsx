import React, { useEffect, useState } from "react";
import useVoucherCustomer from "../hooks/useVoucherCustomer";

const CustomerInfoDialog = ({ customer, onClose }) => {
    const { voucherCustomers, loading, error } = useVoucherCustomer(customer?.id);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        console.log("Customer ID:", customer?.id); // Kiểm tra xem customer có id hay không
        if (customer?.id && !hasFetched) {
            console.log("Fetching vouchers for customer:", customer.id);
            setHasFetched(true); // Đánh dấu đã tải dữ liệu
        }
    }, [customer?.id, hasFetched]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Thông tin khách hàng</h2>
                {customer ? (
                    <div>
                        {customer.name && (
                            <p className="text-lg mb-2">
                                <strong className="text-gray-700">Tên:</strong> {customer.name}
                            </p>
                        )}
                        {customer.email && (
                            <p className="text-lg mb-2">
                                <strong className="text-gray-700">Email:</strong> {customer.email}
                            </p>
                        )}
                        {customer.phone && customer.phone !== '0' && (
                            <p className="text-lg mb-2">
                                <strong className="text-gray-700">Số điện thoại:</strong> {customer.phone}
                            </p>
                        )}
                        {customer.address && (
                            <p className="text-lg mb-6">
                                <strong className="text-gray-700">Địa chỉ:</strong> {customer.address}
                            </p>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Danh sách Voucher của bạn</h3>

                            {/* Hiển thị trạng thái loading và error */}
                            {loading ? (
                                <p className="text-center text-gray-500">Đang tải voucher...</p>
                            ) : error ? (
                                <p className="text-red-500 text-center">{error}</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {voucherCustomers.length > 0 ? (
                                        voucherCustomers
                                            .filter((voucher) => voucher.status_cus !== "used") // Lọc chỉ những voucher có status_cus không phải 'used'
                                            .map((voucher) => (
                                                <div
                                                    key={voucher.voucher_id}
                                                    className="p-5 border border-orange-500 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out bg-white"
                                                >
                                                    <div className="flex justify-between items-center mb-4">
                                                        <p className="text-xl font-bold text-gray-800">{voucher.code}</p>
                                                        <span
                                                            className={`text-xs px-3 py-1 rounded-full ${voucher.status === "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                                                                }`}
                                                        >
                                                            {voucher.status === "active" ? "Còn hiệu lực" : "Hết hiệu lực"}
                                                        </span>
                                                    </div>

                                                    {/* Hiển thị giảm theo phần trăm và giảm theo tiền mà không kiểm tra */}
                                                    <p className="text-sm text-gray-700 mb-2">
                                                        Giảm:{" "}
                                                        <span className="font-semibold">
                                                            {voucher.discount_percentage > 0 ? `${voucher.discount_percentage}%` : `${voucher.discount_amount} VNĐ`}
                                                        </span>
                                                    </p>

                                                    {voucher.min_order_amount && (
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            Đơn tối thiểu: <span className="font-semibold">{voucher.min_order_amount} VNĐ</span>
                                                        </p>
                                                    )}

                                                    {voucher.max_discount_amount && (
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            <span className="font-semibold">
                                                                {voucher.discount_percentage > 0
                                                                    ? `Số tiền giảm tối đa: ${voucher.max_discount_amount} VNĐ`
                                                                    : ""}
                                                            </span>
                                                        </p>
                                                    )}

                                                    {voucher.expiration_date && (
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            Hạn dùng:{" "}
                                                            <span className="font-semibold">{new Date(voucher.expiration_date).toLocaleDateString()}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-center text-gray-500">Không có voucher nào.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy thông tin khách hàng.</p>
                )}
                <button
                    onClick={onClose}
                    className="mt-6 w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default CustomerInfoDialog;
