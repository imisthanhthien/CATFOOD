const db = require('../db');

// Lấy tất cả mối quan hệ giữa giảm giá và đơn hàng
const getAllOrderDiscountMaps = (callback) => {
    const sql = 'SELECT * FROM order_discount_map';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy mối quan hệ giảm giá và đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa giảm giá và đơn hàng theo order_id
const getDiscountsByOrderId = (orderId, callback) => {
    const sql = `
        SELECT d.id, d.code, d.description
        FROM order_discount_map od
        JOIN discounts d ON od.discount_id = d.id
        WHERE od.order_id = ?
    `;
    db.query(sql, [orderId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy giảm giá theo order_id:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa giảm giá và đơn hàng theo discount_id
const getOrdersByDiscountId = (discountId, callback) => {
    const sql = `
        SELECT o.id, o.order_date
        FROM order_discount_map od
        JOIN orders o ON od.order_id = o.id
        WHERE od.discount_id = ?
    `;
    db.query(sql, [discountId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy đơn hàng theo discount_id:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Thêm mối quan hệ giảm giá và đơn hàng
const addOrderDiscountMapping = (orderId, discountId, callback) => {
    const sql = 'INSERT INTO order_discount_map (order_id, discount_id) VALUES (?, ?)';
    db.query(sql, [orderId, discountId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm mối quan hệ giảm giá và đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Xóa mối quan hệ giảm giá và đơn hàng
const deleteOrderDiscountMapping = (orderId, discountId, callback) => {
    const sql = 'DELETE FROM order_discount_map WHERE order_id = ? AND discount_id = ?';
    db.query(sql, [orderId, discountId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa mối quan hệ giảm giá và đơn hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllOrderDiscountMaps,
    getDiscountsByOrderId,
    getOrdersByDiscountId,
    addOrderDiscountMapping,
    deleteOrderDiscountMapping
};
