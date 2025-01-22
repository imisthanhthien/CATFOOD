const express = require('express');
const router = express.Router();
const voucherCustomerController = require('../controllers/voucherCustomerController.jsx');

// Lấy tất cả voucher của khách hàng
router.get('/:customerId', voucherCustomerController.getAllVouchersByCustomer);
// Thêm voucher cho khách hàng
router.post('/', voucherCustomerController.addVoucherToCustomer);
// Xóa voucher của khách hàng
router.delete('/:customerId/:voucherId', voucherCustomerController.deleteVoucherFromCustomer);
router.post('/add-voucher-to-all', voucherCustomerController.addVoucherToAllCustomers);
router.post('/remove-voucher-from-all', voucherCustomerController.removeVoucherFromAllCustomers);
router.put('/update-status/:customerId/:voucherCode', voucherCustomerController.updateVoucherStatus);
router.get('/check-status/:customerId/:voucherCode', voucherCustomerController.checkVoucherStatusController);

module.exports = router;
