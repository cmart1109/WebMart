const express = require('express');
const router = express.Router();
const storesController = require('../controllers/stores');
const storeValidator = require('../utilities/storeValidator');
const { isAuthenticated } = require('../utilities/authenticate')

router.get('/', storesController.getAllStores);
router.get('/:id', storesController.getSingleStore);
router.post('/', isAuthenticated, storeValidator.storeValidationRules(), storesController.createStore);
router.put('/:id', isAuthenticated, storeValidator.storeValidationRules(), storesController.updateStore);
router.delete('/:id', isAuthenticated, storesController.deleteStore);

module.exports = router 