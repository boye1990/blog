### Session

#### 之前我们已经用 cookie 实现了登录校验，但是我们是将用户信息直接存在了cookie中。 这样就存在安全问题，容易暴露用户信息。同时cookie的大小只有5kb，如果用户信息很大，很有可能存不下。

#### 为了解决这个问题，我们使用session来实现。

#### session 是在服务端存储一个用户信息，通过在浏览器生产的 cookie userid，来获取用户信息。

- 解决了用户信息存在浏览器，暴露的风险。也解决了cookie存储量小的弊端。

#### 实现逻辑

- 在 app.js 中 新建一个 SESSION_DATA 变量，赋值一个空对象，用来存所有session。

```javascript
    let SESSION_DATA = {} // 设置session数据存放变量
```

- 在 app.js 中 serverHandle 函数中，解析 session 。首先判断 cookie中 有没有userid，没有就生成一个userid，通过 时间戳 + 随机数的形式。

``` javascript
    let needSession = false // 判断是否需要设置session
    let userId = req.cookie.userId // 检查请求体的cookie是否携带userId

    if(userId) { // 如果携带了
        if(!SESSION_DATA[userId]) { // 如果 SESSION_DATA 中没有对应的 userId的key和value
            SESSION_DATA[userId] = {} // 为SESSION_DATA添加 userId 为 key，并且赋值空对象
        }
    } else {
        // 如果没有携带，就生成一个随机不重复的 userid ，并且将needSession设置为true
        needSession = true
        userId = `${Date.now()}_${Math.random()}`
        // 并为SESSION_DATA添加 userId 为 key，并且赋值空对象
        SESSION_DATA[userId] = {}
    }
    // 将 SESSION_DATA[userId] 赋值给 请求体 存在 session字段中。
    req.session = SESSION_DATA[userId]
```

- 然后在每个模块的 handleRouter 函数中 将这个 userid 设置成 cookie。

```javascript
    // 处理user路由（接口）
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
```
- 完成以上步骤之后，我们在服务端已经存储了一个 SESSION_DATA 对象，里面存放着 一个以 userid 为key， value为空对象的属性。可以通过 SESSION_DATA[userid] 获取,并将他放入req.session属性中。在这个req.session属性对象里面，我们可以在登录接口登录成功的时候，去存放用户信息。

```javascript

    const result = login(userName, password)
    return result.then(loginData => {
        if(loginData.length) {
            // 登录成功, 设置cookie。将用户的信息设置在cookie里面，在需要登录的页面，获取请求头带过来的cookie，来判断是否登录。
            // httpOnly ： 可以限制浏览器通过js修改cookie。他可以加上其他cookie，但是不会覆盖这次设置的登录信息cookie，浏览器置cookie，始终在这里设置的cookie的前面
            // 在app.js中解析cookie的时候，我们取的是最后一个cookie的值，因此可以达到限制浏览器修改cookie的值的效果
            // getCookieExpires返回设置的过期时间
            // res.setHeader('set-cookie', `userName=${userName}; path=/; httpOnly; Expires=${getCookieExpires()`)
            
            // 登录成功
            req.session.userName = userName
            req.session.password = password
            return new SuccessModel(loginData, '登录成功')
        } else {
            console.log('123')
            return new ErrorModel('用户名或者密码错误')
        }
        
    }).catch(err => {
        console.log(err)
        return new ErrorModel(err, '用户名或者密码错误')
    })

```

- 因为在上一步中，我们将 用户信息 都存在了 req.session 属性里面，所以我们在需要登录校验的接口请求的时候，都可以通过 req.session 去判断是否登录。

- 这样我们即达到登录校验的效果，又规避了将用户信息暴露在cookie中的风险，以及cookie存储空间不足的弊端。