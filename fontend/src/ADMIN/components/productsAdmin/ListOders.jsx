import React, { useState, useEffect } from 'react'; 
import useOrders from '../../../hooks/useOders';
import useOrderItems from '../../../hooks/useOderItem';
import useProducts from '../../../hooks/useProducts';
import useCustomers from '../../../hooks/useCustomers';


const convertToVietnamTime = (utcDate) => {
    const date = new Date(utcDate);
    return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
};

const ListOrders = () => {
    const { orders, deleteOrderById, updateOrderStatus, actionLoading, actionError } = useOrders();
    const { addOrderItem } = useOrderItems();
    const { updateProductById, fetchProductQuantityById } = useProducts();
    const { customers } = useCustomers(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [customerDetail, setCustomerDetail] = useState(null);

    const getCustomerNameById = (customerId) => {
        const customer = customers.find(customer => customer.id === customerId);
        return customer ? customer.name : 'Khách hàng không tồn tại';
    };

    const handleViewCustomerDetail = (customerId) => {
        const customer = customers.find(customer => customer.id === customerId);
        setCustomerDetail(customer);
        setIsCustomerModalOpen(true);
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
            try {
                await deleteOrderById(id);
                alert('Đơn hàng đã được xóa thành công!');
            } catch (error) {
                console.error(actionError);
                alert('Lỗi khi xóa đơn hàng.');
            }
        }
    };

    const handleApproveOrder = async (order) => {
        try {
            const detailOrder = JSON.parse(order.detail_order);
            const orderItems = detailOrder.map((product) => {
                const quantity = parseInt(product.quantity, 10);
                return {
                    order_id: order.id,
                    product_id: product.id,
                    quantity: quantity,
                    price: parseFloat(product.price),
                    time: new Date().toISOString(),
                };
            });

            await updateOrderStatus(order.id, 'shipping');
            console.log(order.id);

            const productItems = await Promise.all(detailOrder.map(async (product) => {
                const currentQuantity = await fetchProductQuantityById(product.id);
                const updatedFields = {
                    quantity: currentQuantity.quantity - parseInt(product.quantity, 10),
                };
                return { productId: product.id, updatedFields };
            }));

            const validProductItems = productItems.filter(item => item !== null);
            await Promise.all(orderItems.map((orderItem) => addOrderItem(orderItem)));
            await Promise.all(validProductItems.map((productItem) => updateProductById(productItem.productId, productItem.updatedFields)));

            alert('Đơn hàng đã được duyệt và thêm vào order_items!');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi trong khi duyệt đơn hàng:', error);
            alert('Lỗi trong khi duyệt đơn hàng.');
        }
    };

    const handleViewDetail = (order) => {
        try {
            const parsedDetail = JSON.parse(order.detail_order);
            setOrderDetail(parsedDetail);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi parse chi tiết đơn hàng:', error);
            alert('Có lỗi khi hiển thị chi tiết đơn hàng.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderDetail(null);
    };

    const closeCustomerModal = () => {
        setIsCustomerModalOpen(false);
        setCustomerDetail(null);
    };


    const filteredOrders = orders.filter(order => {
        if (selectedStatus === '') return true; 
        return order.status === selectedStatus;
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Danh Sách Đơn Hàng</h2>
            <div className="mb-4">
                <label htmlFor="status" className="mr-2">Chọn trạng thái:</label>
                <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Tất cả</option>
                    <option value="pending">Đang chờ xử lý</option>
                    <option value="shipping">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p>Chưa có đơn hàng nào với trạng thái đã chọn.</p>
            ) : (
                <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Tên khách hàng</th>
                            <th className="px-4 py-2 border-b text-left">Ngày đặt</th>
                            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
                            <th className="px-4 py-2 border-b text-left">Tổng giá</th>
                            <th className="px-4 py-2 border-b text-left">Chi Tiết</th>
                            <th className="px-4 py-2 border-b text-left">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleViewCustomerDetail(order.customer_id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        {getCustomerNameById(order.customer_id)} 
                                    </button>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {convertToVietnamTime(order.order_date).toLocaleString()}
                                </td>
                                <td className="px-4 py-2 border-b">{order.status}</td>
                                <td className="px-4 py-2 border-b">{order.total_price}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleViewDetail(order)}
                                        className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        Xem Chi Tiết
                                    </button>
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {order.status === 'shipping' ? (
                                        <button className="px-4 py-1 bg-gray-500 text-white rounded-md" disabled>
                                            Đã duyệt
                                        </button>
                                    ) : order.status === 'delivered' ? (
                                        <button className="px-4 py-1 bg-green-500 text-white rounded-md" disabled>
                                            Đã giao
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleApproveOrder(order)}
                                            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            Duyệt
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ml-2"
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal hiển thị thông tin khách hàng */}
            {isCustomerModalOpen && customerDetail && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-10 rounded-lg w-full max-w-3xl relative max-h-[90vh] overflow-auto shadow-xl transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
                        <h3 className="text-4xl font-semibold text-center mb-8 text-gray-900">Thông tin khách hàng</h3>

                        <div className="space-y-5">
                            <div className="flex justify-start items-center space-x-4">
                                <p className="font-medium text-gray-800 w-32">Tên:</p>
                                <p className="text-gray-600 flex-1">{customerDetail.name}</p>
                            </div>
                            <div className="flex justify-start items-center space-x-4">
                                <p className="font-medium text-gray-800 w-32">Email:</p>
                                <p className="text-gray-600 flex-1">{customerDetail.email}</p>
                            </div>
                            <div className="flex justify-start items-center space-x-4">
                                <p className="font-medium text-gray-800 w-32">Địa chỉ:</p>
                                <p className="text-gray-600 flex-1">{customerDetail.address}</p>
                            </div>
                            <div className="flex justify-start items-center space-x-4">
                                <p className="font-medium text-gray-800 w-32">Số điện thoại:</p>
                                <p className="text-gray-600 flex-1">{customerDetail.phone}</p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-4">
                            <button
                                onClick={closeCustomerModal}
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chi tiết đơn hàng */}
            {isModalOpen && Array.isArray(orderDetail) && orderDetail.length > 0 && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[80vw] max-w-3xl relative max-h-[90vh] overflow-auto">
                        <h3 className="text-2xl font-semibold mb-4">Chi Tiết Sản phẩm đã đặt</h3>

                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b text-left">Ảnh sản phẩm</th>
                                    <th className="px-4 py-2 border-b text-left">Tên sản phẩm</th>
                                    <th className="px-4 py-2 border-b text-left">Mô tả</th>
                                    <th className="px-4 py-2 border-b text-left">Giá</th>
                                    <th className="px-4 py-2 border-b text-left">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-4 py-2 border-b">
                                            <img
                                                src={`http://localhost:8081/${product.image}`}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b">{product.name}</td>
                                        <td className="px-4 py-2 border-b">{product.description}</td>
                                        <td className="px-4 py-2 border-b">{product.price} VND</td>
                                        <td className="px-4 py-2 border-b">{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => handleApproveOrder(orderDetail)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Duyệt Đơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListOrders;