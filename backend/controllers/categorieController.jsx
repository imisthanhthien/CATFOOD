const orderModel = require('../models/categorieModel.jsx');

// Lấy danh sách tất cả danh mục sản phẩm
const getAllCategories = (req, res) => {
    orderModel.getAllCategories((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy danh mục sản phẩm', error: err });
        }
        res.status(200).json(results);
    });
};

// Lấy danh mục sản phẩm theo ID
const getCategoryById = (req, res) => {
    const categoryId = req.params.id;
    
    orderModel.getCategoryById(categoryId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy danh mục sản phẩm theo ID', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'Danh mục sản phẩm không tồn tại' });
        }
        res.status(200).json(result);
    });
};

// Thêm danh mục sản phẩm mới
const addCategory = (req, res) => {
    const category = req.body;
    
    orderModel.addCategory(category, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm danh mục sản phẩm', error: err });
        }
        res.status(201).json({ message: 'Danh mục sản phẩm đã được thêm thành công', data: result });
    });
};

// Sửa thông tin danh mục sản phẩm
const updateCategoryById = (req, res) => {
    const categoryId = req.params.id;
    const updatedFields = req.body;

    orderModel.updateCategoryById(categoryId, updatedFields, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi sửa danh mục sản phẩm', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'Danh mục sản phẩm không tồn tại' });
        }
        res.status(200).json({ message: 'Danh mục sản phẩm đã được cập nhật', data: result });
    });
};

// Xóa danh mục sản phẩm theo ID
const deleteCategoryById = (req, res) => {
    const categoryId = req.params.id;

    orderModel.deleteCategoryById(categoryId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa danh mục sản phẩm', error: err });
        }
        if (!result) {
            return res.status(404).json({ message: 'Danh mục sản phẩm không tồn tại' });
        }
        res.status(200).json({ message: 'Danh mục sản phẩm đã được xóa' });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById
};
