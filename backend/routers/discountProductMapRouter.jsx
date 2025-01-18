const express = require('express');
const router = express.Router();
const discountProductMapController = require('../controllers/discountProductMapController.jsx');

router.get('/', discountProductMapController.getAllDiscountProductMaps);

router.get('/products/:discountId', discountProductMapController.getProductsByDiscountId);

router.get('/discounts/:productId', discountProductMapController.getDiscountsByProductId);

router.post('/', discountProductMapController.addDiscountProductMapping);

router.delete('/discount/:discountId/product/:productId', discountProductMapController.deleteDiscountProductMapping);

router.get('/check-product/:productId', discountProductMapController.checkProductDiscount);

router.get('/check-discount/:discountId', discountProductMapController.checkDiscountExists);

router.get('/discount-id/:productId', discountProductMapController.getDiscountIdByProductId);

module.exports = router;
