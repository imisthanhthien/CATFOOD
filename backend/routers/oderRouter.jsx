const express = require('express');
const router = express.Router();
const orderController = require('../controllers/oderController.jsx');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.addOrder);
router.put('/:id', orderController.updateOrderById);
router.delete('/:id', orderController.deleteOrderById);
router.put('/:id/status', orderController.updateStatus);

module.exports = router;
