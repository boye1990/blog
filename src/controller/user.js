const { exec } = require('../db/mysql')
/**
 * 
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
const login = (userName, password) => {
    const sql = `select * from users where userName='${userName}' and password='${password}'`
    return exec(sql)
}

module.exports = {
    login
}