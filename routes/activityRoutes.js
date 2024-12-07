// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/', activityController.getActivitys);
router.post('/', activityController.createActivity);
router.get('/:id', activityController.getActivityById);
router.put('/:id', activityController.updateActivityById);
router.delete('/:id', activityController.deleteActivityById);

module.exports = router;