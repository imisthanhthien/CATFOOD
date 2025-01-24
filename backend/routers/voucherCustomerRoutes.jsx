const express = require('express');
const router = express.Router();
const voucherCustomerController = require('../controllers/voucherCustomerController.jsx');

router.get('/:customerId', voucherCustomerController.getAllVouchersByCustomer);
router.post('/', voucherCustomerController.addVoucherToCustomer);
router.delete('/:customerId/:voucherId', voucherCustomerController.deleteVoucherFromCustomer);
router.post('/add-voucher-to-all', voucherCustomerController.addVoucherToAllCustomers);
router.post('/remove-voucher-from-all', voucherCustomerController.removeVoucherFromAllCustomers);
router.put('/update-status/:customerId/:voucherCode', voucherCustomerController.updateVoucherStatus);
router.get('/check-status/:customerId/:voucherCode', voucherCustomerController.checkVoucherStatusController);

module.exports = router;
