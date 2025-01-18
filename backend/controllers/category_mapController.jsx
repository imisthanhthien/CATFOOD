const productCategoryMapModel = require('../models/category_mapModel.jsx');

// Lấy tất cả bản ghi trong bảng product_category_map
const getAllProductCategoryMaps = (req, res) => {
    productCategoryMapModel.getAllProductCategoryMaps((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy danh sách bản ghi product_category_map' });
        }
        res.status(200).json(results);
    });
};

// Lấy danh mục của sản phẩm theo ID sản phẩm
const getCategoriesByProductId = (req, res) => {
    const productId = req.params.productId;
    productCategoryMapModel.getCategoriesByProductId(productId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy danh mục sản phẩm theo ID sản phẩm' });
        }
        res.status(200).json(results);
    });
};

// Lấy sản phẩm theo ID danh mục
const getProductsByCategoryId = (req, res) => {
    const categoryId = req.params.categoryId;
    productCategoryMapModel.getProductsByCategoryId(categoryId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy sản phẩm theo ID danh mục' });
        }
        res.status(200).json(results);
    });
};

// Lấy tất cả mối quan hệ giữa sản phẩm và danh mục
const getAllProductCategoryRelations = (req, res) => {
    productCategoryMapModel.getAllProductCategoryRelations((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi lấy danh sách mối quan hệ giữa sản phẩm và danh mục' });
        }
        res.status(200).json(results);
    });
};

// Thêm mối quan hệ giữa sản phẩm và danh mục
const addProductCategoryMapping = (req, res) => {
    const { productId, categoryId } = req.body;
    productCategoryMapModel.addProductCategoryMapping(productId, categoryId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi thêm mối quan hệ giữa sản phẩm và danh mục' });
        }
        res.status(201).json({ message: 'Mối quan hệ giữa sản phẩm và danh mục đã được thêm thành công', data: results });
    });
};

// Xóa mối quan hệ giữa sản phẩm và danh mục
const deleteProductCategoryMapping = (req, res) => {
    const { productId, categoryId } = req.params;
    productCategoryMapModel.deleteProductCategoryMapping(productId, categoryId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi xóa mối quan hệ giữa sản phẩm và danh mục' });
        }
        if (!results) {
            return res.status(404).json({ error: 'Không tìm thấy mối quan hệ để xóa' });
        }
        res.status(200).json({ message: 'Mối quan hệ giữa sản phẩm và danh mục đã được xóa thành công' });
    });
};
// Cập nhật mối quan hệ giữa sản phẩm và danh mục
const updateProductCategoryMapping = (req, res) => {
    const { productId, newCategoryId } = req.body;
    productCategoryMapModel.updateProductCategoryMapping(productId, newCategoryId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi cập nhật mối quan hệ giữa sản phẩm và danh mục' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy mối quan hệ để cập nhật' });
        }
        res.status(200).json({ message: 'Mối quan hệ giữa sản phẩm và danh mục đã được cập nhật thành công', data: results });
    });
};

module.exports = {
    getAllProductCategoryMaps,
    getCategoriesByProductId,
    getProductsByCategoryId,
    getAllProductCategoryRelations,
    addProductCategoryMapping,
    deleteProductCategoryMapping,
    updateProductCategoryMapping
};
