/**
 * 通过这个封装mysql文件，让node和mysql连接
 */

const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象,放入配置

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 的函数

function exec(sql) {
    // 因为这是一个异步所以使用promise

    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

// 在这里不能关闭连接，因为我们关闭之后就无法再开启，只会开启一起。我们就保持一直开启的状态，成为一个单例模式

module.exports = {
    exec
}
