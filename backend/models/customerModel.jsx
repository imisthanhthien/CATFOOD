const db = require('../db'); // Import kết nối từ db.js

// Lấy danh sách tất cả khách hàng
const getAllCustomers = (callback) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy khách hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

//Lấy ID khách hàng theo email
const getIDCustomerByEmail = (email, callback) => {
    const sql = 'SELECT id FROM customers WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy khách hàng theo email:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]); 
    });
};

// Lấy khách hàng theo ID
const getCustomerById = (customerId, callback) => {
    const sql = 'SELECT * FROM customers WHERE id = ?';
    db.query(sql, [customerId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy khách hàng theo ID:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

// Lấy tất cả khách hàng theo email
const getCustomerByEmail = (email, callback) => {
    const sql = 'SELECT * FROM customers WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy khách hàng theo email:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]);
    });
};

//Kiểm tra email tồn tại
const checkEmailExists = (email, callback) => {
    const sql = 'SELECT COUNT(*) AS count FROM customers WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra email:', err);
            return callback(err, null);
        }
        const emailExists = results[0].count > 0;
        callback(null, emailExists);
    });
};

// Thêm khách hàng mới
const addCustomer = (customer, callback) => {
    const sql = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
    const values = [
        customer.name,
        customer.email,
        customer.phone,
        customer.address
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm khách hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Sửa thông tin khách hàng
const updateCustomerById = (customerId, updatedFields, callback) => {
    const fields = Object.keys(updatedFields)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedFields);
    values.push(customerId);

    const sql = `UPDATE customers SET ${fields} WHERE id = ?`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa khách hàng:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); 
        }
        callback(null, results);
    });
};

// Xóa thông tin  khách hàng
const deleteCustomerById = (customerId, callback) => {
    const sql = 'DELETE FROM customers WHERE id = ?';

    db.query(sql, [customerId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa khách hàng:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); 
        }
        callback(null, results);
    });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByEmail,
    getIDCustomerByEmail,
    addCustomer,
    updateCustomerById,
    deleteCustomerById,
    checkEmailExists
};
