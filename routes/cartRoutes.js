// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/list', authMiddleware, cartController.getCarts);
router.post('/add', authMiddleware, cartController.addCart);
router.get('/sum', authMiddleware, cartController.sum);
router.put('/selectAll', authMiddleware, cartController.selectAll);
router.put('/unSelectAll', authMiddleware, cartController.unSelectAll);
router.put('/:productId', authMiddleware, cartController.updateCount);
router.delete('/:productId', authMiddleware, cartController.deleteCart);



module.exports = router;