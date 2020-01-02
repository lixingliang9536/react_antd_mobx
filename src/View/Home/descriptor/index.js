const descriptor = {
  text: [
    {type: 'string', max: 3, message: '长度不能超过3个字符'},
    {required: true, message: "必输项"},
    {validator(rule,value,callback,source,options){
      if(value === "123"){
        callback("不能为123")
      }else{
        return true
      }
    }}
  ]
}
export default descriptor