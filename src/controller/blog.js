/**
 * 
 * @param {String} author 作者
 * @param {String} keyword id
 * 处理博客列表的请求逻辑，并返回数据
 */
const getList = (author, keyword) => {
    // 先返回假数据，但是格式是正确的
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '1234',
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: '12345',
            author: 'lisi'
        }
    ]
}

/**
 * 
 * @param {String} id 详情id
 */
const getDetail = (id) => {
    return {
        id: 1,
        title: '',
        content: '',
        createTime: 12345,
        author: 'zhangsan'
    }
}

/**
 * 
 * @param {String} content 博客内容
 * @param {String} title 博客标题
 * 新建博客接口
 */
const newBlog = (content, title) => {
    return true
}

/**
 * 
 * @param {String} id 需要修改的博客id
 * @param {String} content 修改的内容
 * @param {String} title 标题修改的内容
 * 更新博客
 */
const update = (id,content, title) => {
    return true
}

/**
 * 
 * @param {String} id 要删除的博客id
 * 删除博客 
 */
const deletBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    update,
    deletBlog
}