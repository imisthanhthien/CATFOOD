const db = require('../db');

// Lấy tất cả mối quan hệ giữa giảm giá và sản phẩm
const getAllDiscountProductMaps = (callback) => {
    const sql = 'SELECT * FROM discount_product_map';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy mối quan hệ giảm giá và sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa giảm giá và sản phẩm theo discount_id
const getProductsByDiscountId = (discountId, callback) => {
    const sql = `
        SELECT p.id, p.name
        FROM discount_product_map dp
        JOIN products p ON dp.product_id = p.id
        WHERE dp.discount_id = ?
    `;
    db.query(sql, [discountId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy sản phẩm theo discount_id:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa giảm giá và sản phẩm theo product_id
const getDiscountsByProductId = (productId, callback) => {
    const sql = `
        SELECT d.id, d.code, d.description, d.discount_value
        FROM discount_product_map dp
        JOIN discounts d ON dp.discount_id = d.id
        WHERE dp.product_id = ?
    `;
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy giảm giá theo product_id:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

const addDiscountProductMapping = (discountId, productId, callback) => {
    const sql = 'INSERT INTO discount_product_map (discount_id, product_id) VALUES (?, ?)';
    db.query(sql, [discountId, productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm mối quan hệ giảm giá và sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};



// Kiểm tra xem mối quan hệ giữa sản phẩm và giảm giá đã tồn tại chưa
const checkDiscountProductExists = (productId, discountId, callback) => {
    const sql = 'SELECT * FROM discount_product_map WHERE product_id = ? AND discount_id = ?';
    db.query(sql, [productId, discountId], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra mối quan hệ giảm giá và sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Kiểm tra sản phẩm có giảm giá hay không
const checkProductDiscount = (productId, callback) => {
    const sql = `
        SELECT CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM discount_product_map 
                WHERE product_id = ?
            ) THEN 1 
            ELSE 0 
        END AS is_discounted
    `;
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra sản phẩm có giảm giá hay không:', err);
            return callback(err, null);
        }
        callback(null, results[0].is_discounted); // Trả về 1 hoặc 0
    });
};

// Xóa mối quan hệ giảm giá và sản phẩm
const deleteDiscountProductMapping = (discountId, productId, callback) => {
    const sql = 'DELETE FROM discount_product_map WHERE discount_id = ? AND product_id = ?';
    db.query(sql, [discountId, productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa mối quan hệ giảm giá và sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};
// Lấy discount_id từ product_id
const getDiscountIdByProductId = (productId, callback) => {
    const sql = `
        SELECT dp.discount_id
        FROM discount_product_map dp
        WHERE dp.product_id = ?
    `;
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy discount_id theo product_id:', err);
            return callback(err, null);
        }
        if (results.length > 0) {
            callback(null, results[0].discount_id); // Trả về discount_id nếu có
        } else {
            callback(null, null); // Không có mối quan hệ giảm giá cho sản phẩm
        }
    });
};

const checkDiscountExists = (discountId, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM discount_product_map WHERE discount_id = ?';
    db.query(query, [discountId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Kiểm tra nếu có ít nhất một dòng, tức là discount_id tồn tại
        callback(null, results[0].count > 0);
    });
};



module.exports = {
    getAllDiscountProductMaps,
    getProductsByDiscountId,
    getDiscountsByProductId,
    addDiscountProductMapping,
    deleteDiscountProductMapping,
    checkDiscountProductExists,
    checkProductDiscount,
    getDiscountIdByProductId,
    checkDiscountExists
};
