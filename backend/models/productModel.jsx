const db = require('../db'); 

// Lấy danh sách tất cả sản phẩm
const getAllProducts = (callback) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};
module.exports = {
    getAllProducts
};

// Lấy sản phẩm theo ID
const getProductById = (productId, callback) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy sản phẩm theo ID:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]);
    });
};

// Lấy số lượng sản phẩm theo ID
const getProductQuantityById = (productId, callback) => {
    const sql = 'SELECT quantity FROM products WHERE id = ?'; 
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy số lượng sản phẩm theo ID:', err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0].quantity); 
    });
};

//Thêm sản phẩm mới
const addProduct = (product, callback) => {
    const sql = 'INSERT INTO products (id, name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        product.id,
        product.name,
        product.description,
        product.price,
        product.quantity,
        product.image
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm sản phẩm:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

//Sửa thông tin sản phẩm
const updateProductById = (productId, updatedFields, callback) => {
    const fields = Object.keys(updatedFields)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = Object.values(updatedFields);
    values.push(productId);

    const sql = `UPDATE products SET ${fields} WHERE id = ?`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa sản phẩm:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); 
        }
        callback(null, results); 
    });
};

//Xóa sản phẩm theo ID
const deleteProductById = (productId, callback) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa sản phẩm:', err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null); 
        }
        callback(null, results); 
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductQuantityById,
    addProduct,
    updateProductById,
    deleteProductById
};
