const db = require('../db'); 

// Lấy danh sách tất cả các chi tiết đơn hàng
const getAllOrderItems = (callback) => {
    const sql = 'SELECT * FROM order_items';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách tất cả các chi tiết đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Tìm kiếm chi tiết đơn hàng theo số lượng và giá
const searchOrderItemsByQuantityAndPrice = (minQuantity, minPrice, callback) => {
    const sql = 'SELECT * FROM order_item WHERE quantity >= ? AND price >= ?';
    db.query(sql, [minQuantity, minPrice], (err, results) => {
        if (err) {
            console.error('Lỗi khi tìm kiếm chi tiết đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results); 
    });
};

// Tìm kiếm chi tiết đơn hàng theo order_id, số lượng và giá
const searchOrderItemsByOrderIdAndQuantityAndPrice = (orderId, minQuantity, minPrice, callback) => {
    const sql = 'SELECT * FROM order_item WHERE order_id = ? AND quantity >= ? AND price >= ?';
    db.query(sql, [orderId, minQuantity, minPrice], (err, results) => {
        if (err) {
            console.error('Lỗi khi tìm kiếm chi tiết đơn hàng theo order_id:', err);
            return callback(err, null);
        }
        callback(null, results); 
    });
};

// Thêm chi tiết đơn hàng vào order_item
const addOrderItem = (orderItem, callback) => {
    const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price, time) VALUES (?, ?, ?, ?, ?)';
    const values = [
        orderItem.order_id,
        orderItem.product_id,
        orderItem.quantity,
        orderItem.price,
        orderItem.time
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm chi tiết đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results); 
    });
};

module.exports = {
    getAllOrderItems,
    searchOrderItemsByQuantityAndPrice,
    searchOrderItemsByOrderIdAndQuantityAndPrice,
    addOrderItem,
};

