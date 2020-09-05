/**
 * 这是一个mysql配置文件， 需要安装maysql依赖
 */

 // 首先获取node环境变量，判断当前所在环境

 const env = process.env.NODE_ENV

 console.log('-----当前所在环境：-----', env)

 // 创建mysql配置

 let MYSQL_CONF

 if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost', // 域名
        user: 'root', // mysql用户名
        password: 'zbh123456', // 密码
        port: '3306', // 端口号
        database: 'myblog' // 要操作的数据库
    }
 }

 if(env === 'production') {
    // 现在都是本地的数据库，所有和开发环境是一样，上线后需要更改
    MYSQL_CONF = {
        host: 'localhost', // 域名
        user: 'root', // mysql用户名
        password: 'zbh123456', // 密码
        port: '3306', // 端口号
        database: 'myblog' // 要操作的数据库
    }

 }

 module.exports = {
    MYSQL_CONF
 }