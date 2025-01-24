const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController.jsx');

router.get('/', voucherController.getAllVouchers);
router.get('/:code', voucherController.getVoucherByCode);
router.post('/', voucherController.addVoucher);
router.put('/:id', voucherController.updateVoucher);
router.delete('/:id', voucherController.deleteVoucher);
router.post('/apply', voucherController.applyVoucher);
router.post('/check-exists', voucherController.checkVoucherExists);

module.exports = router;
