const discountModel = require('../models/discountModel.jsx');

// Lấy tất cả các giảm giá
const getAllDiscounts = (req, res) => {
    discountModel.getAllDiscounts((err, discounts) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy giảm giá', error: err });
        }
        res.status(200).json(discounts);
    });
};

// Lấy giảm giá theo mã
const getDiscountByCode = (req, res) => {
    const { code } = req.params;
    discountModel.getDiscountByCode(code, (err, discount) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy giảm giá theo mã', error: err });
        }
        if (!discount) {
            return res.status(404).json({ message: 'Giảm giá không tồn tại' });
        }
        res.status(200).json(discount);
    });
};

// Thêm giảm giá mới
const addDiscount = (req, res) => {
    const discount = req.body;
    discountModel.addDiscount(discount, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm giảm giá', error: err });
        }
        res.status(201).json({ message: 'Giảm giá đã được thêm', id: result.insertId });
    });
};

// Cập nhật giảm giá theo ID
const updateDiscountById = (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    discountModel.updateDiscountById(id, updatedFields, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi cập nhật giảm giá', error: err });
        }
        res.status(200).json({ message: 'Giảm giá đã được cập nhật' });
    });
};

// Xóa giảm giá theo ID
const deleteDiscountById = (req, res) => {
    const { id } = req.params;
    discountModel.deleteDiscountById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa giảm giá', error: err });
        }
        res.status(200).json({ message: 'Giảm giá đã được xóa' });
    });
};

module.exports = {
    getAllDiscounts,
    getDiscountByCode,
    addDiscount,
    updateDiscountById,
    deleteDiscountById
};
