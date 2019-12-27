import React, {Component} from 'react';
import {Button} from 'antd'
import { inject, observer } from 'mobx-react'

import './index.less'

@inject('UserContent')
@observer
export default class Home extends Component {
  constructor(){
    super()
  }

  tolink = ()=>{
    console.log(this.props)
    this.props.history.push('detail')
  }

  render(){
    return (
      <div>
        <div className='text'>hello react</div>
        <div className='text'>这是Home组件</div>
        <a href='#/detail'>去 Detail 组件</a>
        <Button onClick={this.tolink}>通过函数跳转到 Detail 组件</Button>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.uname}</h2>
        <h2>这是 UserContent 中的公共数据 {this.props.UserContent.upwd}</h2>
      </div>
    )
  }
}