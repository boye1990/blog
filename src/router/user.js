const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method
    // 登录接口
    if(method === 'POST' && req.path === '/api/user/login') {
        const { userName, password } = req.body
        if(!userName || !password) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('用户名，密码不能为空'))
            })
            return promise
        } else {
            const result = login(userName, password)
            return result.then(loginData => {
                if(loginData.length) {
                    return new SuccessModel(loginData, '登录成功')
                } else {
                    return new ErrorModel(err, '用户名或者密码错误')
                }
                
            }).catch(err => {
                return new ErrorModel(err, '用户名或者密码错误')
            })
        }
    }
    console.log('条件不匹配')
}

module.exports = handleUserRouter