/**
 * 定义接口返回时，成功和失败的模型
 */

 // 第一步创建一个父类，设计公共属性

 class BaseModel {
     // 处理返回数据的时候，我们可能会返回一个msg和data，也可能返回一个msg。
     constructor(data, message) {
         // 如果传入的只是一个msg，就要兼容一下，将data赋值给实例的message属性上
         if(typeof data === "string") {
             this.message = data
             data = null
             message = null
         }
         // 如果data存在并且不是string，说明他是返回数据，赋值到实例的data属性上
         if(data) {
             this.data = data
         }
         // 同上
         if(message) {
             this.message = message
         }
     }
 }

 // 创建一个处理请求成功的返回数据类型，继承了上面的父类

 class SuccessModel extends BaseModel {
     constructor(data, message) {
         // 执行一下super函数，相当于执行了父类的构造函数
         super(data, message)
         // 这个类型除了有父类的属性，还有一个固定返回代表请求成功的属性，errno,并且他的值是0，前端可以通过这个值判断，自己是否请求成功。
         this.errno = 0
     }
 }

 // 创建一个处理请求异常的返回数据类型，也继承上面的父类

 class ErrorModel extends BaseModel{
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
 }

 module.exports = {
    SuccessModel,
    ErrorModel
 }