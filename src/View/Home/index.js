import React, {Component} from 'react';
import { Button, Input } from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'
import small_pic from 'img/small.jpg';
import { Bind, InputItem, Validator } from 'components/Common-Library'
import { observable } from 'mobx';
import mHome from './model/index'

@inject('UserContent')
@observer
export default class Home extends Component {
  constructor(){
    super()
    this.model = new mHome()
    this.bind = Bind.bind(this)
  }

  componentWillMount(){
    this.model.openMonitor && this.model.openMonitor()
  }

  tolink = (path)=>{
    console.log(this.props)
    this.props.history.push(path)
  }

  getNewData = ()=>{
    console.log(this.model.text)
    Validator.validate(this.model, this.model.descriptor, (err,val)=>{
      if(err){
        console.log(err.async-validator)
        return
      }
      console.log("-------校验通过-------")
      this.model.text ++
    })
  }

  onAfterChange = ()=>{
    console.log("onAfterChange")
  }

  onBlur = ()=>{
    console.log("onBlur")
  }

  render(){
    const bind = this.bind
    return (
      <div>
        <div className='text'>hello react</div>
        <div className='text'>这是Home组件</div><br />
        <a href='#/detail'>去 Detail 组件</a><br /><br />
        <Button onClick={()=>this.tolink("detail")}>通过函数跳转到 Detail 组件</Button>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.uname}</h2>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.upwd}</h2>
        {/* <img src={small_pic} alt="" /> */}
        <Button onClick={()=>this.tolink("login")}>通过函数跳转到 Login 组件</Button>
        <InputItem InputProps={bind('text')} onAfterChange={this.onAfterChange} onBlur={this.onBlur} />
        <Input size='small' maxLength={3} />
        <Button onClick={this.getNewData}>点击改变输入框的内容</Button>
      </div>
    )
  }
}