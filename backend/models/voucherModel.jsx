const db = require('../db');

// Lấy tất cả các voucher
const getAllVouchers = (callback) => {
    const sql = 'SELECT * FROM vouchers';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy tất cả các voucher:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Tìm kiếm voucher theo mã
const getVoucherByCode = (code, callback) => {
    const sql = 'SELECT * FROM vouchers WHERE code = ?';
    db.query(sql, [code], (err, results) => {
        if (err) {
            console.error('Lỗi khi tìm kiếm voucher theo mã:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Thêm một voucher mới
const addVoucher = (voucher, callback) => {
    const sql = 'INSERT INTO vouchers (code, discount_percentage, discount_amount, min_order_amount, expiration_date, status, max_discount_amount) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
        voucher.code,
        voucher.discount_percentage,
        voucher.discount_amount,
        voucher.min_order_amount,
        voucher.expiration_date,
        voucher.status,
        voucher.max_discount_amount
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm voucher:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Cập nhật voucher
const updateVoucher = (voucherId, updatedVoucher, callback) => {
    const sql = 'UPDATE vouchers SET code = ?, discount_percentage = ?, discount_amount = ?, min_order_amount = ?, expiration_date = ?, status = ? , max_discount_amount = ?  WHERE id = ?';
    const values = [
        updatedVoucher.code,
        updatedVoucher.discount_percentage,
        updatedVoucher.discount_amount,
        updatedVoucher.min_order_amount,
        updatedVoucher.expiration_date,
        updatedVoucher.status,
        updatedVoucher.max_discount_amount,
        voucherId
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật voucher:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Xóa một voucher
const deleteVoucher = (voucherId, callback) => {
    const sql = 'DELETE FROM vouchers WHERE id = ?';
    db.query(sql, [voucherId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa voucher:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Kiểm tra tính hợp lệ của voucher
// Kiểm tra tính hợp lệ của voucher
const checkVoucher = (voucherCode, cartTotal, customerId, callback) => {
    const sql = 'SELECT * FROM vouchers WHERE code = ?';
    db.query(sql, [voucherCode], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy voucher:', err);
            return callback(err, null);
        }

        if (results.length === 0) {
            return callback(new Error('Voucher không hợp lệ'), null);
        }

        const voucher = results[0];
        
        // Kiểm tra trạng thái của voucher
        if (voucher.status !== 'active') {
            return callback(new Error('Voucher không còn hiệu lực'), null);
        }

        // Kiểm tra ngày hết hạn của voucher
        const currentDate = new Date();
        if (new Date(voucher.expiration_date) < currentDate) {
            return callback(new Error('Voucher đã hết hạn'), null);
        }

        // Kiểm tra giá trị đơn hàng có đủ điều kiện không
        if (cartTotal < voucher.min_order_amount) {
            return callback(new Error(`Đơn hàng phải có giá trị tối thiểu ${voucher.min_order_amount}₫`), null);
        }

        // Trả về voucher nếu tất cả điều kiện hợp lệ
        return callback(null, voucher);
    });
};

const checkVoucherExists = (code, callback) => {
    const sql = 'SELECT * FROM vouchers WHERE code = ?';
    db.query(sql, [code], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra sự tồn tại voucher:', err);
            return callback(err, null);
        }
        
        // Nếu tìm thấy kết quả, voucher tồn tại
        if (results.length > 0) {
            return callback(null, true); // Voucher tồn tại
        } else {
            return callback(null, false); // Voucher không tồn tại
        }
    });
};


module.exports = {
    getAllVouchers,
    getVoucherByCode,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    checkVoucher, 
    checkVoucherExists,// Thêm hàm checkVoucher vào module exports
};
