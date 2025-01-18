const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorieController.jsx');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
