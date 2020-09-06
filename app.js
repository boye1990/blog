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
 const querystring = require('querystring')
 // 引入用户路由
 const handleUserRouter = require('./src/router/user')

 /**
  * 
  * @param {Object} req 请求体
  * 因为post请求获取请求参数的过程是数据流的形式获取，是一个异步过程，需要使用promise特殊处理
  */
 const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 如果请求方法不是post 就返回一个空对象
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        // 如果他的请求头不是json格式，就返回一个空对象
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        // 不是以上2种情况就开始异步处理post请求的参数
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString() // chunk是一个2进制数据，要转化成字符串
        })
        req.on('end', () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    }) 
    return promise
 }

 /**
  * 
  * @param {Object} req 请求数据
  * @param {Object} res 返回数据
  */

 const serverHandle = (req, res) => {
    // 去除请求的path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 设置返回头 返回数据类型
    res.setHeader('content-type', 'application/json')

    // 处理路由接口之前，要通过getPostData函数把请求参数处理完
    getPostData(req).then(postData => {
        // 我们在这里就能获取到完整的postData，将它放在req中，在后续处理路由的时候就都能拿到postdata了
        req.body = postData
        // 处理blog路由（接口）
        const blogresult = handleBlogRouter(req, res)
        
        if(blogresult) {
            blogresult.then(blogData => {
                console.log(blogData, 'app.js')
                res.end(
                    JSON.stringify(blogData)
                )
            })
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
        })
 }

 module.exports = serverHandle