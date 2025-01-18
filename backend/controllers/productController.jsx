const productModel = require('../models/productModel.jsx');

// Lấy tất cả sản phẩm
const getAllProduct = (req, res) => {
    productModel.getAllProducts((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể lấy sản phẩm' });
        }
        return res.status(200).json(users);
    });
};

//Lấy số lượng sản phẩm theo ID
const getProductQuantityById = (req, res) => {
    const productId = req.params.id; 
    productModel.getProductQuantityById(productId, (err, quantity) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể lấy số lượng sản phẩm', error: err });
        }
        if (quantity === null) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json({ quantity: quantity });
    });
};

// Lấy sản phẩm theo ID
const getProductById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm theo ID' });
        }
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json(product);
    });
};

// Thêm sản phẩm
const addProduct = (req, res) => {
    const newProduct = req.body;

    productModel.addProduct(newProduct, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm' });
        }
        return res.status(201).json({ message: 'Thêm sản phẩm thành công', productId: results.insertId });
    });
};

// Xóa sản phẩm 
const deleteProductById = (req, res) => {
    const productId = req.params.id; // 

    productModel.deleteProductById(productId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
        }
        if (!results || results.affectedRows === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    });
};

// Sửa sản phẩm theo ID
const updateProductById = (req, res) => {
    const productId = req.params.id; 
    const updatedFields = req.body; 

    productModel.updateProductById(productId, updatedFields, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi sửa sản phẩm' });
        }
        if (!results || results.affectedRows === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại hoặc không có thay đổi' });
        }
        return res.status(200).json({ message: 'Sửa sản phẩm thành công' });
    });
};

module.exports = {
    getAllProduct,
    getProductById,
    getProductQuantityById,
    addProduct,
    deleteProductById,
    updateProductById
};
