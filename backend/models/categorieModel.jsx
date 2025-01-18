const db = require('../db');

// Lấy danh sách tất cả danh mục sản phẩm
const getAllCategories = (callback) => {
    const sql = 'SELECT * FROM product_categories';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh mục sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};



// Lấy danh mục sản phẩm theo ID
const getCategoryById = (categoryId, callback) => {
    const sql = 'SELECT * FROM product_categories WHERE id = ?';
    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh mục sản phẩm theo ID:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

// Thêm danh mục sản phẩm mới
const addCategory = (category, callback) => {
    const sql = 'INSERT INTO product_categories (id, name) VALUES (?, ?)';
    const values = [
        category.id,
        category.name,
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm danh mục sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Sửa thông tin danh mục sản phẩm
const updateCategoryById = (categoryId, updatedFields, callback) => {
    const fields = Object.keys(updatedFields)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedFields);
    values.push(categoryId);

    const sql = `UPDATE product_categories SET ${fields} WHERE id = ?`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa danh mục sản phẩm:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null);
        }
        callback(null, results);
    });
};

// Xóa danh mục sản phẩm theo ID
const deleteCategoryById = (categoryId, callback) => {
    const sql = 'DELETE FROM product_categories WHERE id = ?';

    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa danh mục sản phẩm:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById
};
