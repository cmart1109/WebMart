const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const productsValidator = require('../utilities/productsValidator')
const {isAuthenticated} = require("../utilities/authenticate")

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSigleProduct);
router.post('/', isAuthenticated, productsValidator.productValidationRules(), productsController.createProduct);
router.put('/:id', isAuthenticated, productsValidator.productValidationRules(), productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router