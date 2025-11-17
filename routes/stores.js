const express = require('express');
const router = express.Router();
const storesController = require('../controllers/stores');
const storeValidator = require('../utilities/storeValidator');

router.get('/', storesController.getAllStores);
router.get('/:id', storesController.getSingleStore);
router.post('/', storeValidator.storeValidationRules(), storesController.createStore);
router.put('/:id', storeValidator.storeValidationRules(), storesController.updateStore);
router.delete('/:id', storesController.deleteStore);

module.exports = router