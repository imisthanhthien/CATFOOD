const db = require('../db');

// Lấy tất cả các voucher của khách hàng
const getAllVouchersByCustomer = (customerId, callback) => {
    const sql = `
         SELECT 
            vouchers.id AS voucher_id,
            vouchers.code,
            vouchers.discount_percentage,
            vouchers.discount_amount,
            vouchers.min_order_amount,
            vouchers.expiration_date,
            vouchers.status,
            voucher_customer.status as status_cus,
            vouchers.max_discount_amount,
            voucher_customer.applied_date
        FROM 
            voucher_customer
        INNER JOIN 
            vouchers 
        ON 
            voucher_customer.voucher_id = vouchers.id
        WHERE 
            voucher_customer.customer_id = ?;
    `;
    db.query(sql, [customerId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách voucher:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};


// Thêm voucher cho khách hàng
const addVoucherToCustomer = (customerId, voucherId, callback) => {
    const sql = 'INSERT INTO voucher_customer (customer_id, voucher_id) VALUES (?, ?)';
    db.query(sql, [customerId, voucherId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm voucher cho khách hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

//Thêm voucher cho khách hàng
const addVoucherToAllCustomers = (voucherCode, callback) => {
    const getVoucherSql = 'SELECT id FROM vouchers WHERE code = ?';
    db.query(getVoucherSql, [voucherCode], (err, voucherResults) => {
        if (err) {
            console.error('Lỗi khi lấy voucher:', err);
            return callback(err, null);
        }

        if (voucherResults.length === 0) {
            console.error('Voucher không tồn tại');
            return callback(new Error('Voucher không tồn tại'), null);
        }

        const voucherId = voucherResults[0].id;
        const getCustomersSql = 'SELECT id FROM customers ORDER BY id ASC';
        db.query(getCustomersSql, (err, customerResults) => {
            if (err) {
                console.error('Lỗi khi lấy khách hàng:', err);
                return callback(err, null);
            }

            if (customerResults.length === 0) {
                console.error('Không có khách hàng nào');
                return callback(new Error('Không có khách hàng nào'), null);
            }

            let counter = 0;
            customerResults.forEach((customer) => {
                addVoucherToCustomer(customer.id, voucherId, (err, results) => {
                    if (err) {
                        console.error(`Lỗi khi thêm voucher cho khách hàng ${customer.id}:`, err);
                    } else {
                        console.log(`Đã thêm voucher cho khách hàng ${customer.id}`);
                    }
                    counter++;
                    if (counter === customerResults.length) {
                        callback(null, { message: 'Voucher đã được thêm cho tất cả khách hàng' });
                    }
                });
            });
        });
    });
};

//Xóa voucher cho tất cả khách hàng
const removeVoucherFromAllCustomers = (voucherCode, callback) => {
    const getVoucherSql = 'SELECT id FROM vouchers WHERE code = ?';
    db.query(getVoucherSql, [voucherCode], (err, voucherResults) => {
        if (err) {
            console.error('Lỗi khi lấy voucher:', err);
            return callback(err, null);
        }

        if (voucherResults.length === 0) {
            console.error('Voucher không tồn tại');
            return callback(new Error('Voucher không tồn tại'), null);
        }

        const voucherId = voucherResults[0].id;
        const getCustomersSql = 'SELECT id FROM customers ORDER BY id ASC';

        db.query(getCustomersSql, (err, customerResults) => {
            if (err) {
                console.error('Lỗi khi lấy khách hàng:', err);
                return callback(err, null);
            }

            if (customerResults.length === 0) {
                console.error('Không có khách hàng nào');
                return callback(new Error('Không có khách hàng nào'), null);
            }

            let counter = 0;
            customerResults.forEach((customer) => {
    
                deleteVoucherFromCustomer(customer.id, voucherId, (err, results) => {
                    if (err) {
                        console.error(`Lỗi khi xóa voucher cho khách hàng ${customer.id}:`, err);
                    } else {
                        console.log(`Đã xóa voucher cho khách hàng ${customer.id}`);
                    }

                    counter++;
                    if (counter === customerResults.length) {
                        callback(null, { message: 'Voucher đã được xóa khỏi tất cả khách hàng' });
                    }
                });
            });
        });
    });
};

// Xóa voucher cho 1 khách hàng
const deleteVoucherFromCustomer = (customerId, voucherId, callback) => {
    const sql = 'DELETE FROM voucher_customer WHERE customer_id = ? AND voucher_id = ?';
    db.query(sql, [customerId, voucherId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa voucher của khách hàng:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

//Cập nhật voucher cho 1 khách hàng
const updateVoucherStatus = (customerId, voucherCode) => {
    return new Promise((resolve, reject) => {
        
        if (!customerId || !voucherCode) {
            return reject(new Error('Thông tin customerId hoặc voucherCode không hợp lệ'));
        }
        // SQL query để cập nhật status của voucher trong bảng voucher_customer, set status luôn là 'used'
        const sql = `
            UPDATE voucher_customer 
            SET status = 'used' 
            WHERE customer_id = ? 
            AND voucher_id = (SELECT id FROM vouchers WHERE code = ?)
        `;
        
        db.query(sql, [customerId, voucherCode], (err, results) => {
            if (err) {
                console.error('Lỗi khi cập nhật status voucher:', err);
                return reject(new Error('Có lỗi xảy ra khi cập nhật trạng thái voucher.'));
            }
            
            if (results.affectedRows === 0) {
                console.log('Không tìm thấy voucher hoặc khách hàng không hợp lệ.');
                return reject(new Error('Không tìm thấy voucher hoặc khách hàng không hợp lệ.'));
            }
            console.log('Voucher status updated successfully.');
            resolve(results); 
        });
    });
};
  
// Kiểm tra trạng thái voucher của 1 khách hàng 
const checkVoucherStatus = (customerId, voucherCode, callback) => {
    const sql = `
        SELECT 
            voucher_customer.status
        FROM 
            voucher_customer
        INNER JOIN 
            vouchers 
        ON 
            voucher_customer.voucher_id = vouchers.id
        WHERE 
            voucher_customer.customer_id = ? 
            AND vouchers.code = ?;
    `;
    
    db.query(sql, [customerId, voucherCode], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra trạng thái voucher:', err);
            return callback(err, null);
        }

        if (results.length === 0) {
            console.log('Không tìm thấy voucher hoặc khách hàng không hợp lệ.');
            return callback(new Error('Không tìm thấy voucher hoặc khách hàng không hợp lệ'), null);
        }

        const status = results[0].status;

        if (status === 'used') {
            return callback(null, 1); 
        }
        return callback(null, 0); 
    });
};

module.exports = {
    getAllVouchersByCustomer,
    addVoucherToCustomer,
    deleteVoucherFromCustomer,
    addVoucherToAllCustomers,
    removeVoucherFromAllCustomers,
    updateVoucherStatus,
    checkVoucherStatus,

};
