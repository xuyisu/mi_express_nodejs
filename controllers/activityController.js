// controllers/userController.js
const Activity = require('../models/Activity');
const { successResponse, errorResponse } = require('../utils/response');

exports.getActivitys = async (req, res) => {
    try {
        const activitys = await Activity.findAll();
        res.json(successResponse(activitys));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

exports.createActivity = async (req, res) => {
    const newActivity = new Activity(req.body);
    try {
        await newActivity.save();
        res.json(successResponse(newActivity));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.json(errorResponse('Activity not found'));
        }
        res.json(successResponse(activity));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

exports.updateActivityById = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedActivity) {
            return res.json(errorResponse('Activity not found'));
        }
        res.json(successResponse(updatedActivity));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

exports.deleteActivityById = async (req, res) => {
    try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) {
            return res.json(errorResponse('Activity not found'));
        }
        res.json(successResponse());
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};