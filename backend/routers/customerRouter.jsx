const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController.jsx');

router.get('/', customerController.getAllCustomers); 
router.get('/:id', customerController.getCustomerById); 
router.get('/email/:email', customerController.getCustomerByEmail); 
router.get('/email/id/:email', customerController.getIDCustomerByEmail); 
router.get('/check-email/:email', customerController.checkEmailExists);
router.post('/', customerController.addCustomer);
router.put('/:id', customerController.updateCustomerById); 
router.delete('/:id', customerController.deleteCustomerById); 

module.exports = router;
