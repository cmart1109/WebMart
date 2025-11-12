const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products')

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSigleProduct)


module.exports = router