import React, {Component} from 'react';
import {Button} from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'
import small_pic from 'img/small.jpg';

@inject('UserContent')
@observer
export default class Home extends Component {
  constructor(){
    super()
  }

  tolink = (path)=>{
    console.log(this.props)
    this.props.history.push(path)
  }

  render(){
    return (
      <div>
        <div className='text'>hello react</div>
        <div className='text'>这是Home组件</div><br />
        <a href='#/detail'>去 Detail 组件</a><br /><br />
        <Button onClick={()=>this.tolink("detail")}>通过函数跳转到 Detail 组件</Button>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.uname}</h2>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.upwd}</h2>
        <img src={small_pic} alt="" />
        <Button onClick={()=>this.tolink("login")}>通过函数跳转到 Login 组件</Button>
      </div>
    )
  }
}