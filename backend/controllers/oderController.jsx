const orderModel = require('../models/oderModel.jsx');

// Lấy danh sách tất cả orders
const getAllOrders = (req, res) => {
    orderModel.getAllOrders((err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách orders:', err);
            return res.status(500).send('Lỗi khi lấy danh sách orders');
        }
        res.status(200).json(results);
    });
};

// Lấy thông tin order theo ID
const getOrderById = (req, res) => {
    const { id } = req.params;

    orderModel.getOrderById(id, (err, result) => {
        if (err) {
            console.error('Lỗi khi lấy order theo ID:', err);
            return res.status(500).send('Lỗi khi lấy order theo ID');
        }
        if (!result) {
            return res.status(404).send('Không tìm thấy order');
        }
        res.status(200).json(result);
    });
};

// Thêm mới order
const addOrder = (req, res) => {
    const order = req.body;

    if (!order.customer_id || !order.order_date || !order.status || !order.total_price) {
        return res.status(400).send('Thiếu thông tin cần thiết để thêm order');
    }

    orderModel.addOrder(order, (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm order:', err);
            return res.status(500).send('Lỗi khi thêm order');
        }
        res.status(201).send(`Order mới đã được thêm với ID: ${result.insertId}`);
    });
};

// Sửa thông tin order theo ID
const updateOrderById = (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).send('Không có thông tin nào để cập nhật');
    }

    orderModel.updateOrderById(id, updatedFields, (err, result) => {
        if (err) {
            console.error('Lỗi khi sửa order:', err);
            return res.status(500).send('Lỗi khi sửa order');
        }
        if (!result) {
            return res.status(404).send('Không tìm thấy order để cập nhật');
        }
        res.status(200).send('Order đã được cập nhật thành công');
    });
};

// Xóa order theo ID
const deleteOrderById = (req, res) => {
    const { id } = req.params;

    orderModel.deleteOrderById(id, (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa order:', err);
            return res.status(500).send('Lỗi khi xóa order');
        }
        if (!result) {
            return res.status(404).send('Không tìm thấy order để xóa');
        }
        res.status(200).send('Order đã được xóa thành công');
    });
};
// Cập nhật trạng thái của đơn hàng
const updateStatus = (req, res) => {
    const { id } = req.params; // ID của đơn hàng cần cập nhật
    const { status } = req.body; // Trạng thái mới

    // Kiểm tra nếu không có trạng thái
    if (!status) {
        return res.status(400).send('Thiếu thông tin trạng thái cần cập nhật');
    }

    orderModel.updateStatus(id, status, (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
            return res.status(500).send('Lỗi khi cập nhật trạng thái đơn hàng');
        }
        if (!result) {
            return res.status(404).send('Không tìm thấy order để cập nhật trạng thái');
        }
        res.status(200).send('Trạng thái đơn hàng đã được cập nhật thành công');
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrderById,
    deleteOrderById,
    updateStatus
};
