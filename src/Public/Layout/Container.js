import React, { Component } from 'react'
import './index.less'

export default class PageContainer extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div>
        <h3 className='contentTitle'>后台管理系统</h3>
        <div>
          {/* 页面主要内容 */}
          {this.props.router}
        </div>
      </div>
    )
  }
}