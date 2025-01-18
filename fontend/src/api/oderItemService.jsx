
// Lấy danh sách khách hàng qua backend
export const getOrderItems = async () => {
    const response = await fetch('http://localhost:8081/order_items');
    if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách chi tiết đơn hàng');
    }
    const data = await response.json();
    return data;
};


// Thêm chi tiết đơn hàng qua backend
export const addOrderItem = async (orderItem) => {
    const response = await fetch('http://localhost:8081/order_items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItem),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi thêm chi tiết đơn hàng');
    }

    const data = await response.json();
    return data;
};
