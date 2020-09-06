// 引入处理接口逻辑的函数

const { getList, getDetail, newBlog, update, deletBlog } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(res => {
            console.log(res)
            return new SuccessModel(res, '成功')
        }).catch((err) => {
            console.log(err)
        })
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || ''

        if (!id) {
            return new ErrorModel('id不能为空')
        } else {
            const detailData = getDetail(id)
            return new SuccessModel(detailData, '请求成功')
        }
    }

    // 新增一篇博客
    if(method === "POST" && req.path === '/api/blog/new') {
        // 因为是post请求，我们在getPostData方法中以及将参数存在在req.body中，在这通过解构赋值出需要的参数
        const { title, content } = req.body

        if(!title || !content) {
            return new ErrorModel('标题和内容不能为空')
        } else {
            if(newBlog(title, content)) {
                return new SuccessModel('新建成功')
            }
        }
    }

    // 更新一篇博客
    if(method === "POST" && req.path === '/api/blog/update') {
        const { id, content, title } = req.body

        if(!id) {
            return new ErrorModel('博客id不能为空')
        } else if(!content && !title) {
            return new ErrorModel('内容和详情必须有一样存在')
        } else {
            if(update(id, content, title)) {
                return new SuccessModel('更新成功')
            } else {
                return new SuccessModel('该id不存在')
            }
        }
    }

    // 删除一篇博客
    if(method === "POST" && req.path === '/api/blog/delete') {
        const {id} = req.body
        if(!id) {
            return new ErrorModel('id不能为空')
        } else {
            if(deletBlog(id)) {
                return new SuccessModel('删除成功')
            } else {
                return new SuccessModel('该id不存在')
            }
        }
    }
}

module.exports = handleBlogRouter