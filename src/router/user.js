const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method

    // 登录接口
    if(method === 'POST' && req.path === '/api/user/login') {
        const { userName, password } = req.body
        if(!userName || !password) {
            return new ErrorModel('登录失败，用户名，密码不能为空')
        } else {
            if(login(userName, password)) {
                return new SuccessModel('登录成功')
            } else {
                return new ErrorModel('用户名或者密码错误')
            }
        }
        return {
            msg: '这个是登陆接口'
        }
    }
}

module.exports = handleUserRouter