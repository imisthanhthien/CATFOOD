
// Lấy danh sách đơn hàng qua backend
export const getOrders = async () => {
    const response = await fetch('http://localhost:8081/orders');
    if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách đơn hàng');
    }
    const data = await response.json();
    return data;
};

// Lấy thông tin đơn hàng theo ID qua backend
export const getOrderById = async (id) => {
    const response = await fetch(`http://localhost:8081/orders/${id}`);
    if (!response.ok) {
        throw new Error('Đơn hàng không tồn tại hoặc lỗi khi lấy dữ liệu');
    }
    const data = await response.json();
    return data;
};

// Thêm đơn hàng qua backend
export const addOrder = async (order) => {
    const response = await fetch('http://localhost:8081/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi thêm đơn hàng');
    }

    const data = await response.json();
    return data;
};

// Xóa đơn hàng qua backend
export const deleteOrderById = async (id) => {
    const response = await fetch(`http://localhost:8081/orders/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Lỗi khi xóa đơn hàng hoặc đơn hàng không tồn tại');
    }

    const data = await response.json();
    return data;
};

// Sửa thông tin đơn hàng qua backend
export const updateOrderById = async (id, updatedFields) => {
    const response = await fetch(`http://localhost:8081/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi sửa thông tin đơn hàng hoặc đơn hàng không tồn tại');
    }

    const data = await response.json();
    return data;
};
// Cập nhật trạng thái đơn hàng qua backend
export const updateOrderStatus = async (id, status) => {
    const response = await fetch(`http://localhost:8081/orders/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Lỗi khi cập nhật trạng thái đơn hàng hoặc đơn hàng không tồn tại');
    }

    const data = await response.json();
    return data;
};
