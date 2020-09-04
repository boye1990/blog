// 引入处理接口逻辑的函数

const { getList } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if(!author || !keyword) {
            return ErrorModel('参数有误，请求失败')
        } else {
            const listData = getList(author, keyword)
            return new SuccessModel(listData, '成功')
        }
    }

    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }

    // 新增一篇博客
    if(method === "POST" && req.path === '/api/blog/new') {
        return {
            msg: '这是新增一篇博客的接口'
        }
    }

    // 更新一篇博客
    if(method === "POST" && req.path === '/api/blog/update') {
        return {
            msg: '这是更新一篇博客的接口'
        }
    }

    // 删除一篇博客
    if(method === "POST" && req.path === '/api/blog/delete') {
        return {
            msg: '这是删除一篇博客的接口'
        }
    }
}

module.exports = handleBlogRouter