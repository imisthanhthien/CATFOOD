const db = require('../db');

// Lấy tất cả các giảm giá
const getAllDiscounts = (callback) => {
    const sql = 'SELECT * FROM discounts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách giảm giá:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy thông tin giảm giá theo mã giảm giá
const getDiscountByCode = (code, callback) => {
    const sql = 'SELECT * FROM discounts WHERE code = ?';
    db.query(sql, [code], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy giảm giá theo mã:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

// Thêm mới giảm giá
const addDiscount = (discount, callback) => {
    const sql = `
        INSERT INTO discounts (code, description, discount_type, discount_value, min_purchase_amount, start_date, end_date, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        discount.code,
        discount.description,
        discount.discount_type,
        discount.discount_value,
        discount.min_purchase_amount,
        discount.start_date,
        discount.end_date,
        discount.is_active
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm giảm giá:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Cập nhật thông tin giảm giá theo ID
const updateDiscountById = (id, updatedFields, callback) => {
    const fields = Object.keys(updatedFields)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedFields);
    values.push(id);

    const sql = `UPDATE discounts SET ${fields} WHERE id = ?`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật giảm giá:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Xóa giảm giá theo ID
const deleteDiscountById = (id, callback) => {
    const sql = 'DELETE FROM discounts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa giảm giá:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllDiscounts,
    getDiscountByCode,
    addDiscount,
    updateDiscountById,
    deleteDiscountById
};
