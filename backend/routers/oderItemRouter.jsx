const express = require('express');
const router = express.Router();

const orderItemController = require('../controllers/oderItemController.jsx'); 

router.get('/', orderItemController.getAllOrderItems);
router.post('/', orderItemController.addOrderItem);
router.get('/:id', orderItemController.getOrderItemById);

module.exports = router;
