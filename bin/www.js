const http = require('http')

const PORT = 8000

// 引入app.js中创建的回调函数，处理请求
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)

console.log('启动完毕')