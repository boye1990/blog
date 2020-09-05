/**
 * 
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
const login = (userName, password) => {
    if(userName === 'zhansan' && password === '123'){
        return true
    } else {
        return false
    }
}

module.exports = {
    login
}