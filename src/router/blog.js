// 引入处理接口逻辑的函数

const { getList, getDetail, newBlog, update, deletBlog } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // 这里接收的也是promise
        const result = getList(author, keyword)

        // 把promise的结果返回到 app.js 调用handleBlogRouter的地方，这里返回的也是promise
        return result.then(listData => {
            return new SuccessModel(listData, '成功')
        }).catch((err) => {
            console.log(err)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || ''
        if(!id) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('id不能为空'))
            })
            return promise
        }
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData, '成功')
        }).catch(err => {
            return new ErrorModel(err, 'id不存在')
        })
    }

    // 新增一篇博客
    if(method === "POST" && req.path === '/api/blog/new') {
        // 因为是post请求，我们在getPostData方法中以及将参数存在在req.body中，在这通过解构赋值出需要的参数
        const { title, content } = req.body
        if(!title || !content) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('标题和内容不能为空'))
            })
            return promise
        } else {
            const result = newBlog(title, content)
            return result.then(newData => {
                return new SuccessModel( newData, '新建成功')
            }).catch(err => {
                return new ErrorModel( err, '新建失败')
            })
        }


    }

    // 更新一篇博客
    if(method === "POST" && req.path === '/api/blog/update') {
        const { id, content, title } = req.body

        if(!id) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('id不能为空'))
            })
            return promise
        } else if(!content && !title) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('内容和详情必须有一样存在'))
            })
            return promise
        } else {
            const result = update(id, content, title)
            return result.then(updateDate => {
                return new SuccessModel(updateDate, '更新成功')
            }).catch (err => {
                return new ErrorModel(err, '该id不存在')
            })
        }
    }

    // 删除一篇博客
    if(method === "POST" && req.path === '/api/blog/delete') {
        const {id} = req.body
        if(!id) {
            const promise = new Promise((resolve, reject) => {
                resolve(new ErrorModel('id不能为空'))
            })
            return promise
        } else {
            const result = deletBlog(id)
            return result.then(deletBlogData => {
                return new SuccessModel(deletBlogData, '删除成功')
            }).catch (err => {
                return new ErrorModel(err, '该id不存在')
            })
        }
    }
}

module.exports = handleBlogRouter