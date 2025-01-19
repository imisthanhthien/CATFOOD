const discountProductMapModel = require('../models/discountProductMapModel.jsx');

// Lấy tất cả mối quan hệ giữa giảm giá và sản phẩm
const getAllDiscountProductMaps = (req, res) => {
    discountProductMapModel.getAllDiscountProductMaps((err, maps) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy mối quan hệ giảm giá và sản phẩm', error: err });
        }
        res.status(200).json(maps);
    });
};

// Lấy mối quan hệ giảm giá và sản phẩm theo discount_id
const getProductsByDiscountId = (req, res) => {
    const { discountId } = req.params;
    discountProductMapModel.getProductsByDiscountId(discountId, (err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm theo discount_id', error: err });
        }
        res.status(200).json(products);
    });
};

// Lấy mối quan hệ giảm giá và sản phẩm theo product_id
const getDiscountsByProductId = (req, res) => {
    const { productId } = req.params;
    discountProductMapModel.getDiscountsByProductId(productId, (err, discounts) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy giảm giá theo product_id', error: err });
        }
        res.status(200).json(discounts);
    });
};

//Thêm mối quan hệ giữa giảm giá và sản phẩm
const addDiscountProductMapping = (req, res) => {
    const { discount_id, product_id } = req.body;  

    console.log('Received data:', discount_id, product_id);  

    discountProductMapModel.addDiscountProductMapping(discount_id, product_id, (err, results) => {
        if (err) {
            console.error('Error from model:', err);  
            return res.status(500).json({ error: 'Có lỗi xảy ra khi thêm mối quan hệ', details: err.message || err });
        }
        console.log('Results from model:', results); 
        return res.status(200).json({ message: 'Giảm giá đã được thêm vào sản phẩm', data: results });
    });
};

// Xóa mối quan hệ giảm giá và sản phẩm
const deleteDiscountProductMapping = (req, res) => {
    const { discountId, productId } = req.params;
    discountProductMapModel.deleteDiscountProductMapping(discountId, productId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa mối quan hệ giảm giá và sản phẩm', error: err });
        }
        res.status(200).json({ message: 'Mối quan hệ đã được xóa' });
    });
};

// Kiểm tra sản phẩm có giảm giá hay không
const checkProductDiscount = (req, res) => {
    const { productId } = req.params;

    discountProductMapModel.checkProductDiscount(productId, (err, isDiscounted) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi kiểm tra sản phẩm có giảm giá hay không', error: err });
        }
        res.status(200).json({ productId, isDiscounted });
    });
};

// Lấy discount_id từ product_id
const getDiscountIdByProductId = (req, res) => {
    const { productId } = req.params;

    discountProductMapModel.getDiscountIdByProductId(productId, (err, discountId) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy discount_id theo product_id', error: err });
        }
        if (discountId === null) {
            return res.status(404).json({ message: 'Không tìm thấy discount_id cho sản phẩm này' });
        }
        res.status(200).json({ productId, discountId });
    });
};

//Kiểm tra tồn tại giảm giá
const checkDiscountExists = (req, res) => {
    const { discountId } = req.params;

    discountProductMapModel.checkDiscountExists(discountId, (err, exists) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi kiểm tra sự tồn tại của discount_id', error: err });
        }
        if (!exists) {
            return res.status(404).json({ message: 'Discount_id không tồn tại' });
        }
        res.status(200).json({ exists: 1 });  // Trả về true nếu tồn tại
    });
};

module.exports = {
    getAllDiscountProductMaps,
    getProductsByDiscountId,
    getDiscountsByProductId,
    addDiscountProductMapping,
    deleteDiscountProductMapping,
    checkProductDiscount,
    getDiscountIdByProductId,
    checkDiscountExists
};
