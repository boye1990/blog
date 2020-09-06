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
    // 返回的是一个promise
    return exec(sql)
 }

/**
 * 
 * @param {String} id 详情id
 */
const getDetail = (id) => {
    let sql =  `select * from blogs where id='${id}';`
    return exec(sql)
}

/**
 * 
 * @param {String} content 博客内容
 * @param {String} title 博客标题
 * 新建博客接口
 */
const newBlog = (content, title) => {
    const sql = `insert into blogs (title, content, createtime, author) values ('${content}', '${title}', ${new Date().getTime()}, '佚名')`
    return exec(sql)
}

/**
 * 
 * @param {String} id 需要修改的博客id
 * @param {String} content 修改的内容
 * @param {String} title 标题修改的内容
 * 更新博客
 */
const update = (id, content, title) => {
    let sql
    if(content && title) {
        sql = `update blogs set content='${content}', title='${title}' where id='${id}';`
    } else if(content && !title) {
        sql = `update blogs set content='${content}' where id=${id};`
    } else {
        sql = `update blogs set title='${title}' where id=${id};`
    }
    return exec(sql)
}

/**
 * 
 * @param {String} id 要删除的博客id
 * 删除博客 
 */
const deletBlog = (id) => {
    const sql = `delete from blogs where id = '${id}';`
    return exec(sql)
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    update,
    deletBlog
}