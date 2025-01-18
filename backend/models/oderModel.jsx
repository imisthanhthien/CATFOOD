const db = require('../db');

// Lấy danh sách tất cả các orders
const getAllOrders = (callback) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách orders:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy thông tin đặt hàng theo ID
const getOrderById = (orderId, callback) => {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    db.query(sql, [orderId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy order theo ID:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]);
    });
};

// Thêm mới đơn đặt hàng
const addOrder = (order, callback) => {
    const sql = 'INSERT INTO orders (customer_id, order_date, status, total_price, detail_order) VALUES (?, ?, ?, ?, ?)';
    const values = [
        order.customer_id,
        order.order_date,
        order.status,
        order.total_price,
        order.detail_order
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm order:', err);
            return callback(err, null);
        }
        callback(null, results); 
    });
};

// Sửa thông tin đặt hàng
const updateOrderById = (orderId, updatedFields, callback) => {
    const fields = Object.keys(updatedFields)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedFields);
    values.push(orderId);

    const sql = `UPDATE orders SET ${fields} WHERE id = ?`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa order:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null);
        }
        callback(null, results);
    });
};

// Xóa đơn đặt hàng theo ID
const deleteOrderById = (orderId, callback) => {
    const sql = 'DELETE FROM orders WHERE id = ?';

    db.query(sql, [orderId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa order:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); 
        }
        callback(null, results);
    });
};

// Cập nhật trạng thái đơn hàng
const updateStatus = (orderId, newStatus, callback) => {
    const sql = 'UPDATE orders SET status = ? WHERE id = ?';
    const values = [newStatus, orderId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); // Trả về null nếu không tìm thấy đơn hàng
        }
        callback(null, results);
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
