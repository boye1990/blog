const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

function set (key, val) {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get (key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            if(val === null) {
                resolve(null)
            }

            try {
                resolve (
                    JSON.parse(val) // 如果val是一个对象的字符串，就转化成对象
                )
            } catch (ex) {
                resolve(val)  // 如果不是就直接返回
            }
            console.log('val', result)
        })
    })
    return promise 
}

module.exports = {
    set,
    get
}