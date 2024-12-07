// controllers/userController.js
const { DELETE_FLAG } = require('../config/constant');
const UserAddress = require('../models/UserAddress');
const formatDate = require('../utils/formatDate');
const { successResponse, errorResponse } = require('../utils/response');

exports.pages = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currrent = 1, size = 10 } = req.query;
        const userAddressList = await UserAddress.findAll({
            where: {
                createUser: userId,
                deleteFlag: DELETE_FLAG.NO
            },
            limit: parseInt(size),
            offset: (parseInt(currrent) - 1) * parseInt(size),
        });
        if (userAddressList.length === 0) {
            return res.json(successResponse());
        }
        userAddressList.forEach(item => {
            item.dataValues.createTime = formatDate(item.createTime);
            item.dataValues.updateTime = formatDate(item.updateTime);
        })
        res.json(successResponse(userAddressList));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 新增
exports.add = async (req, res) => {
    try {
        const userId = req.user.id;
        const newUserAddress = new UserAddress(req.body);
        newUserAddress.createUser = userId;
        newUserAddress.updateUser = userId;
        newUserAddress.addressId = Date.now();
        console.log(newUserAddress);
        await newUserAddress.save();
        res.json(successResponse(newUserAddress));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 详情
exports.detail = async (req, res) => {
    try {
        const addressId = req.params.addressId;
        //根据地址id  查询地址信息
        const userAddress = await UserAddress.findOne({ where: { addressId: addressId, deleteFlag: DELETE_FLAG.NO } });
        if (!userAddress) {
            return res.json(errorResponse('地址不存在'));
        }
        userAddress.dataValues.createTime = formatDate(userAddress.createTime);
        userAddress.dataValues.updateTime = formatDate(userAddress.updateTime);
        res.json(successResponse(userAddress));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 修改
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId
        if (!addressId) {
            return res.json(errorResponse('地址id不能为空'));
        }
        const userAddress = await UserAddress.findOne({ where: { addressId: addressId, deleteFlag: DELETE_FLAG.NO } });
        if (!userAddress) {
            return res.json(errorResponse('地址不存在'));
        }
        const userAddressNew = req.body;
        userAddressNew.updateUser = userId;
        userAddressNew.updateTime = new Date();
        // console.log(userAddressNew);
        await UserAddress.update(userAddressNew, { where: { id: userAddress.id } });
        res.json(successResponse());
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 删除
exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId
        if (!addressId) {
            return res.json(errorResponse('地址id不能为空'));
        }
        const userAddress = await UserAddress.findOne({ where: { addressId: addressId, deleteFlag: DELETE_FLAG.NO } });
        if (!userAddress) {
            return res.json(errorResponse('地址不存在'));
        }
        userAddress.deleteFlag = DELETE_FLAG.YES;
        userAddress.updateUser = userId;
        userAddress.updateTime = new Date();
        await userAddress.save();
        res.json(successResponse());
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};