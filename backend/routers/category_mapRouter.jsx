const express = require('express');
const router = express.Router();
const productCategoryMapController = require('../controllers/category_mapController.jsx');

router.get('/', productCategoryMapController.getAllProductCategoryMaps);
router.get('/product/:productId', productCategoryMapController.getCategoriesByProductId);
router.get('/category/:categoryId', productCategoryMapController.getProductsByCategoryId);
router.get('/relations', productCategoryMapController.getAllProductCategoryRelations);
router.post('/', productCategoryMapController.addProductCategoryMapping);
router.put('/update', productCategoryMapController.updateProductCategoryMapping);
router.delete('/product/:productId/category/:categoryId', productCategoryMapController.deleteProductCategoryMapping);

module.exports = router;
