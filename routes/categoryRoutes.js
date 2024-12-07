// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/list', categoryController.getCategorys);

module.exports = router;