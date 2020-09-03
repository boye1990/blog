/**
 * 从0开始搭建，不使用任何框架
 * 
 * 使用 nodemon 检测文件变化，自动重启 node
 * 
 * 使用 cross-env 设置环境变量，兼容 mac linux 和 windows
 * 
 * 初始化路由：根据之前的技术方案的设计，作出路由
 * 
 * 返回加数据：将路由和数据处理分离，以符合设计原则 
 * 
 * 急事缓做。才能吃透
 * 
 */


 // 引入博客路由
 const handleBlogRouter = require('./src/router/blog')

 // 引入用户路由
 const handleUserRouter = require('./src/router/user')

 const serverHandle = (req, res) => {
    // 设置返回头 返回数据类型
    res.setHeader('content-type', 'application/json')

    // 处理blog路由（接口）
    const blogData = handleBlogRouter(req, res)

    if(blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    // 处理user路由（接口）
    const userData = handleUserRouter(req, res)
    if(userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

     // 如果未匹配以上任何路由（接口） 返回404

     // 重写返回头 文件类型改为纯文本类型
     res.writeHead(404, {"content-type": "text/plain"})
     // 写上返回内容
     res.write("404 Not Found\n")
     res.end()
 }

 module.exports = serverHandle