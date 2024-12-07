// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/pages', productController.getProducts);
router.get('/:productId', productController.detail);


module.exports = router;