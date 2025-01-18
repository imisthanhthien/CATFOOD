const db = require('../db');

// Lấy danh sách tất cả bản ghi trong bảng product_category_map
const getAllProductCategoryMaps = (callback) => {
    const sql = 'SELECT * FROM product_category_map';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách bản ghi product_category_map:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa sản phẩm và danh mục theo ID sản phẩm
const getCategoriesByProductId = (productId, callback) => {
    const sql = `
        SELECT c.id, c.name
        FROM product_category_map pcm
        JOIN product_categories c ON pcm.category_id = c.id
        WHERE pcm.product_id = ?
    `;
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh mục sản phẩm theo ID sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Lấy mối quan hệ giữa sản phẩm và danh mục theo ID danh mục
const getProductsByCategoryId = (categoryId, callback) => {
    const sql = `
        SELECT p.id, p.name
        FROM product_category_map pcm
        JOIN products p ON pcm.product_id = p.id
        WHERE pcm.category_id = ?
    `;
    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy sản phẩm theo ID danh mục:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};
// Lấy tất cả mối quan hệ giữa sản phẩm và danh mục
const getAllProductCategoryRelations = (callback) => {
    const sql = `
        SELECT 
            pcm.product_id, 
            p.name AS product_name, 
            pcm.category_id, 
            c.name AS category_name
        FROM product_category_map pcm
        JOIN products p ON pcm.product_id = p.id
        JOIN product_categories c ON pcm.category_id = c.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách mối quan hệ giữa sản phẩm và danh mục:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Thêm mối quan hệ giữa sản phẩm và danh mục
const addProductCategoryMapping = (productId, categoryId, callback) => {
    const sql = 'INSERT INTO product_category_map (product_id, category_id) VALUES (?, ?)';
    db.query(sql, [productId, categoryId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm mối quan hệ giữa sản phẩm và danh mục:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Xóa mối quan hệ giữa sản phẩm và danh mục
const deleteProductCategoryMapping = (productId, categoryId, callback) => {
    const sql = 'DELETE FROM product_category_map WHERE product_id = ? AND category_id = ?';
    db.query(sql, [productId, categoryId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa mối quan hệ giữa sản phẩm và danh mục:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null);
        }
        callback(null, results);
    });
};
// Cập nhật mối quan hệ giữa sản phẩm và danh mục
const updateProductCategoryMapping = (productId, newCategoryId, callback) => {
    const sql = 'UPDATE product_category_map SET category_id = ? WHERE product_id = ?';
    db.query(sql, [newCategoryId, productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật mối quan hệ giữa sản phẩm và danh mục:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, { message: 'Không tìm thấy sản phẩm để cập nhật.' });
        }
        callback(null, results);
    });
};


module.exports = {
    getAllProductCategoryMaps,
    getCategoriesByProductId,
    getProductsByCategoryId,
    addProductCategoryMapping,
    deleteProductCategoryMapping,
    getAllProductCategoryRelations,
    updateProductCategoryMapping
};
