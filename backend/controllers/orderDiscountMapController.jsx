const orderDiscountMapModel = require('../models/orderDiscountMapModel.jsx');

// Lấy tất cả mối quan hệ giữa giảm giá và đơn hàng
const getAllOrderDiscountMaps = (req, res) => {
    orderDiscountMapModel.getAllOrderDiscountMaps((err, maps) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy mối quan hệ giảm giá và đơn hàng', error: err });
        }
        res.status(200).json(maps);
    });
};

// Lấy mối quan hệ giữa giảm giá và đơn hàng theo order_id
const getDiscountsByOrderId = (req, res) => {
    const { orderId } = req.params;
    orderDiscountMapModel.getDiscountsByOrderId(orderId, (err, discounts) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy giảm giá theo order_id', error: err });
        }
        res.status(200).json(discounts);
    });
};

// Lấy mối quan hệ giữa giảm giá và đơn hàng theo discount_id
const getOrdersByDiscountId = (req, res) => {
    const { discountId } = req.params;
    orderDiscountMapModel.getOrdersByDiscountId(discountId, (err, orders) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy đơn hàng theo discount_id', error: err });
        }
        res.status(200).json(orders);
    });
};

// Thêm mối quan hệ giảm giá và đơn hàng
const addOrderDiscountMapping = (req, res) => {
    const { orderId, discountId } = req.body;
    orderDiscountMapModel.addOrderDiscountMapping(orderId, discountId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm mối quan hệ giảm giá và đơn hàng', error: err });
        }
        res.status(201).json({ message: 'Mối quan hệ đã được thêm', id: result.insertId });
    });
};

// Xóa mối quan hệ giảm giá và đơn hàng
const deleteOrderDiscountMapping = (req, res) => {
    const { orderId, discountId } = req.params;
    orderDiscountMapModel.deleteOrderDiscountMapping(orderId, discountId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi xóa mối quan hệ giảm giá và đơn hàng', error: err });
        }
        res.status(200).json({ message: 'Mối quan hệ đã được xóa' });
    });
};

module.exports = {
    getAllOrderDiscountMaps,
    getDiscountsByOrderId,
    getOrdersByDiscountId,
    addOrderDiscountMapping,
    deleteOrderDiscountMapping
};
