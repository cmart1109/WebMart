const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const productsValidator = require('../utilities/productsValidator')

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSigleProduct);
router.post('/', productsValidator.productValidationRules(), productsController.createProduct);
router.put('/:id', productsValidator.productValidationRules(), productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router