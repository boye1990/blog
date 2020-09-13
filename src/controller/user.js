const { exec } = require('../db/mysql')
/**
 * 
 * @param {String} username 用户名
 * @param {String} password 密码
 */
const login = (username, password) => {
    const sql = `select * from users where userName='${username}' and password='${password}'`
    return exec(sql)
}

module.exports = {
    login
}