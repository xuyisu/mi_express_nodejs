// controllers/userController.js
const Category = require('../models/Category');
const { successResponse, errorResponse } = require('../utils/response');
const formatDate = require('../utils/formatDate'); // 根据你的文件结构调整路径

exports.getCategorys = async (req, res) => {
    try {
        const categorys = await Category.findAll();
        categorys.forEach(category => {
            category.dataValues.createTime = formatDate(category.createTime);
            category.dataValues.updateTime = formatDate(category.updateTime);
        })
        res.json(successResponse(categorys));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

