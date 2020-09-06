const { exec } = require('../db/mysql')

/**
 * 
 * @param {String} author 作者
 * @param {String} keyword id
 * 处理博客列表的请求逻辑，并返回数据
 */
const getList = (author, keyword) => {
    let sql = 'select * from blogs where 1=1 '
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    return exec(sql)
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