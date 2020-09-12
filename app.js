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
 const { get, set } = require('./src/db/redis')

  /**
   * 设置cookie的过期时间
   */
  const getCookieExpires = () => {
      // 获取当前时间
      const d = new Date()
      // 重新设置时间，往后加一天，相当于明天这个时候过期
      d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
      // 转换成cookie专用格式
      return d.toGMTString()
  } 

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

//  let SESSION_DATA = {} // 设置session数据存放变量

 const serverHandle = (req, res) => {

    // 去除请求的path
    const url = req.url
    req.path = url.split('?')[0]
    
    // 设置返回头 返回数据类型
    res.setHeader('content-type', 'application/json')

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie node获取cookie
    // 在登录的接口，登录成功够会设置cookie的值，存储用户名，并且设置了 httpOnly,限制浏览器修改。
    // 在这里我们先解析 cookie， 并把它单独放在请求体中，在需要登录的接口，可以通过req.cookie 来判断，当前是否登录。
    req.cookie = {}
    const cookiestr = req.headers.cookie || '' // k1=v1;k2=v2的格式
    if(cookiestr) {
        cookiestr.split(';').forEach(item => {
            if(!item) {
                return
            }
            const arr = item.split('=')
            console.log(item, 'item')
            const key = arr[0].trim()
            const val = arr[1].trim()
            // 通过循环的方式，获取cookie的值，如果出现相同key的情况，我们取到最后一个值就能将前面的val 覆盖。这样就达到了限制浏览器他修改cookie的目的。因为他修改的cookie，始终在我们server端设置的cookie的前面。永远会被覆盖。
            console.log(key, val, '----')
            req.cookie[key] = val
        })
    }

    // // 解析 session
    // let needSession = false // 判断是否需要设置session
    // let userId = req.cookie.userId // 检查请求体的cookie是否携带userId

    // if(userId) { // 如果携带了
    //     if(!SESSION_DATA[userId]) { // 如果 SESSION_DATA 中没有对应的 userId的key和value
    //         SESSION_DATA[userId] = {} // 为SESSION_DATA添加 userId 为 key，并且赋值空对象
    //     }
    // } else {
    //     // 如果没有携带，就生成一个随机不重复的 userid ，并且将needSession设置为true
    //     needSession = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     // 并为SESSION_DATA添加 userId 为 key，并且赋值空对象
    //     SESSION_DATA[userId] = {}
    // }
    // // 将 SESSION_DATA[userId] 赋值给 请求体 存在 session字段中。
    // req.session = SESSION_DATA[userId]

    // 解析 session (使用 redis)
    let needSession = false
    let userId = req.cookie.userId

    if(!userId) {
        needSession = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值

        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId

    get(req.sessionId).then(sessionData => {
        if(sessionData === null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // 处理 post data
        return getPostData(req)
    })
    .then(postData => { // 处理路由接口之前，要通过getPostData函数把请求参数处理完
        // 我们在这里就能获取到完整的postData，将它放在req中，在后续处理路由的时候就都能拿到postdata了
        req.body = postData
        // 处理blog路由（接口）

        /**
         * node 对接 mysql数据库 流程
         * router 模块 - controller 模块 - db 模块
         * handleBlogRouter -> getList -> exec
         * 返回的都是 promise
         * exec -> getList -> handleBlogRouter
         */
        // 这里接收到的也是一个promise
        const blogresult = handleBlogRouter(req, res)
        
        if(blogresult) {
            blogresult.then(blogData => {
                // 如果需要设置session，就在返回之前设置userId。为上面session解析时生成的userId
                if(needSession) {
                    res.setHeader('set-cookie', `userId=${userId}; path=/; httpOnly; Expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理user路由（接口）
        const userresult = handleUserRouter(req, res)
        if(userresult) {
            userresult.then(userData => {
                // 如果需要设置session，就在返回之前设置userId。为上面session解析时生成的userId
                if(needSession) {
                    res.setHeader('set-cookie', `userId=${userId}; path=/; httpOnly; Expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
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