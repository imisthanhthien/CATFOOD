const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController.jsx');

router.get('/', discountController.getAllDiscounts);
router.get('/:code', discountController.getDiscountByCode);
router.post('/', discountController.addDiscount);
router.put('/:id', discountController.updateDiscountById);
router.delete('/:id', discountController.deleteDiscountById);

module.exports = router;
