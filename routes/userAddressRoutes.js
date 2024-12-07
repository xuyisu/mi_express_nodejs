// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userAddressController = require('../controllers/userAddressController');
const { validateCreateUserAddress } = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/pages', authMiddleware, userAddressController.pages);
router.post('/add', authMiddleware, validateCreateUserAddress, userAddressController.add);
router.get('/:addressId', authMiddleware, userAddressController.detail);
router.put('/:addressId', authMiddleware, validateCreateUserAddress, userAddressController.updateUserById);
router.delete('/:addressId', authMiddleware, userAddressController.deleteUserById);

module.exports = router;