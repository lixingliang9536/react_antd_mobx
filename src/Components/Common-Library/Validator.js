import  schema from 'async-validator';

export default class Validator {
  //定义一个校验方法
  static validate(model, descriptor, callback){
    //向schema传入校验规则，根据规则得到validator校验器
    let validator = new schema(descriptor)
    //调用validator校验器的validate方法，传入需要校验的对象和校验之后的回调函数
    validator.validate(model, (errors, fields)=>{
      //这里先不对错误进行处理，将其直接暴露给外部传入的回调函数，让外部函数根据errors存在与否做出处理
      callback(errors, fields)
    })
  }
}