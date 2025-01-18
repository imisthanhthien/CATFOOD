const express = require('express');
const router = express.Router();
const orderDiscountMapController = require('../controllers/orderDiscountMapController.jsx');

router.get('/', orderDiscountMapController.getAllOrderDiscountMaps);
router.get('/orders/:orderId', orderDiscountMapController.getDiscountsByOrderId);
router.get('/discounts/:discountId', orderDiscountMapController.getOrdersByDiscountId);
router.post('/', orderDiscountMapController.addOrderDiscountMapping);
router.delete('/order/:orderId/discount/:discountId', orderDiscountMapController.deleteOrderDiscountMapping);

module.exports = router;
