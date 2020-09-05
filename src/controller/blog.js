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

module.exports = {
    getList,
    getDetail
}