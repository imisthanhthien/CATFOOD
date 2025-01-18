const express = require('express');
const router = express.Router();
const producController = require('../controllers/productController.jsx');

router.get('/', producController.getAllProduct);
router.get('/:id', producController.getProductById);
router.get('/quantity/:id', producController.getProductQuantityById);
router.post('/', producController.addProduct); 
router.put('/:id', producController.updateProductById); 
router.delete('/:id', producController.deleteProductById);

module.exports = router;
