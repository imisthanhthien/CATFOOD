const db = require('../db'); // Import kết nối từ db.js

// Lấy tất cả người dùng
const getAllUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy người dùng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Thêm người dùng mới
const createUser = (userData, callback) => {
    const {id, name, phone, email } = userData;
    const sql = 'INSERT INTO users (id, name, phone, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [id, name, phone, email], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm người dùng:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Cập nhật người dùng
const updateUser = (id, userData, callback) => {
    const { name, phone, email } = userData;
    const sql = 'UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?';
    db.query(sql, [name, phone, email, id], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật người dùng:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xóa người dùng
const deleteUser = (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa người dùng:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
