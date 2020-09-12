const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

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
                    // 登录成功, 设置cookie。将用户的信息设置在cookie里面，在需要登录的页面，获取请求头带过来的cookie，来判断是否登录。
                    // httpOnly ： 可以限制浏览器通过js修改cookie。他可以加上其他cookie，但是不会覆盖这次设置的登录信息cookie，浏览器设置的cookie，始终在这里设置的cookie的前面
                    // 在app.js中解析cookie的时候，我们取的是最后一个cookie的值，因此可以达到限制浏览器修改cookie的值的效果
                    // getCookieExpires返回设置的过期时间
                    // res.setHeader('set-cookie', `userName=${userName}; path=/; httpOnly; Expires=${getCookieExpires()}`)
                    
                    // 登录成功
                    req.session.userName = userName
                    req.session.password = password
                    // 同步到 redis
                    set(req.sessionId, req.session)
                    return new SuccessModel(loginData, '登录成功')
                } else {
                    console.log('123')
                    return new ErrorModel('用户名或者密码错误')
                }
                
            }).catch(err => {
                console.log(err)
                return new ErrorModel(err, '用户名或者密码错误')
            })
        }
    }
}

module.exports = handleUserRouter