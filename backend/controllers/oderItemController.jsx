const orderItemModel = require('../models/oderItemModel.jsx'); 

// Lấy danh sách tất cả order_items
const getAllOrderItems = (req, res) => {
    orderItemModel.getAllOrderItems((err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách order items:', err);
            return res.status(500).send('Lỗi khi lấy danh sách order items');
        }
        res.status(200).json(results); 
    });
};

// Lấy thông tin order_item theo ID
const getOrderItemById = (req, res) => {
    const { id } = req.params; 

    orderItemModel.getOrderItemById(id, (err, result) => {
        if (err) {
            console.error('Lỗi khi lấy order item theo ID:', err);
            return res.status(500).send('Lỗi khi lấy order item theo ID');
        }
        if (!result) {
            return res.status(404).send('Không tìm thấy order item');
        }
        res.status(200).json(result); 
    });
};

// Thêm mới order_item
const addOrderItem = (req, res) => {
    const orderItem = req.body; 
    if (!orderItem.order_id || !orderItem.product_id || !orderItem.quantity || !orderItem.price) {
        return res.status(400).send('Thiếu thông tin cần thiết để thêm order item');
    }
    orderItemModel.addOrderItem(orderItem, (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm order item:', err);
            return res.status(500).send('Lỗi khi thêm order item');
        }
        res.status(201).send(`Order item mới đã được thêm với ID: ${result.insertId}`); 
    });
};

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    addOrderItem,
};
