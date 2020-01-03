import {isObservable,isObservableProp,observe} from 'mobx'
import { Validator } from 'components/Common-Library'

export default function modelWrapper(target){
  console.log(target.prototype)
  target.prototype.openMonitor = function(){
    for(let key in this){
      if(!isObservableProp(this,key)){
        continue  //只遍历读取被mobx监控的模型变量----这些才是真正想要的变量,如果不是就跳过
      }
      createListener(this,key)
    }
  }
}

// 调用校验方法
export function createListener(_this,key){
  console.log('---------校验规则-------------')
  console.log(_this.descriptor)
  if(_this.descriptor[key]){
    console.log(_this.descriptor[key])
    Validator.validate(_this,{[key]:_this.descriptor[key]},(errors,fields)=>{
      console.log(errors)
      if(errors){
        console.log(errors)
      }
    })
  }
}