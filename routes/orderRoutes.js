// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrderPay } = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/pages', authMiddleware, orderController.getOrders);
router.post('/create', authMiddleware, orderController.create);
router.get('/:orderNo', authMiddleware, orderController.detail);
router.post('/pay', authMiddleware, validateOrderPay, orderController.pay);
router.put('/:orderNo', authMiddleware, orderController.cancel);

module.exports = router;