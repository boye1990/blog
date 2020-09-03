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

 const serverHandle = (req, res) => {
     // 设置返回头 返回数据类型
     res.setHeader('content-type', 'application/json')

     const resData = {
         name: '博烨',
         age: 30,
         env: process.env.NODE_ENV
     }

     res.end(
         JSON.stringify(resData)
     )
 }

 module.exports = serverHandle