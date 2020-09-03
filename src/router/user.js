const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    // 登录接口
    if(method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这个是登陆接口'
        }
    }
}

module.exports = handleUserRouter