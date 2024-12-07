// controllers/userController.js
const { PRODUCT_STATUS, DELETE_FLAG } = require('../config/constant');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const { md5Encrypt } = require('../utils/md5');
const { successResponse, errorResponse } = require('../utils/response');

// 注册
exports.register = async (req, res) => {
    const newUser = new User(req.body);
    try {
        newUser.status = PRODUCT_STATUS.ENABLE
        await newUser.save();
        res.json(successResponse(newUser));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 登录
exports.login = async (req, res) => {
    try {
        //获取用户名密码
        const { userName, password } = req.body;
        console.log(userName, password);
        const user = await User.findOne({ where: { userName: userName, deleteFlag: DELETE_FLAG.NO, status: PRODUCT_STATUS.ENABLE } });
        if (!user) {
            return res.json(errorResponse('用不存在'));
        }

        if (user.password !== md5Encrypt(password)) {
            return res.json(errorResponse('密码错误'));
        }
        //生成jwt信息
        const userResp = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            phone: user.phone
         };
        const token = generateToken(userResp);
        userResp.token = token;
        res.json(successResponse(userResp));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 获取用户信息
exports.getUser = async (req, res) => {
    try {
        res.json(successResponse(req.user));
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};

// 退出登录
exports.logout = async (req, res) => {
    try {
        console.log('logout 请求');
        res.json(successResponse());
    } catch (err) {
        res.json(errorResponse(err.message));
    }
};