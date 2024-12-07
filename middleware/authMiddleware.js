// authMiddleware.js
const { verifyToken } = require('../utils/jwtUtils');
const { errorToken } = require('../utils/response');

/**
 * JWT 验证中间件
 * @param {Request} req - Express 请求对象
 * @param {Response} res - Express 响应对象
 * @param {Function} next - Express 的 next 函数
 */
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.json(errorToken('token 缺失,请重新登录'));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.json(errorToken('token 过期,请重新登录'));
    }

    // 将解码后的负载数据附加到请求对象上，以便在后续中间件或路由处理器中使用
    req.user = decoded;

    next(); // 调用 next 函数以继续处理请求
}

module.exports = authMiddleware;