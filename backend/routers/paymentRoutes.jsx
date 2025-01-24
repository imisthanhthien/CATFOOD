const express = require('express');
const { handleMomoPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/momo', handleMomoPayment);

module.exports = router;
