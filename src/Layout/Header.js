import React, { Component } from 'react'
import { Layout, Menu, Button } from 'antd'
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react'

@inject('UserContent')
@withRouter
export default class PageHeader extends Component {
  constructor(){
    super()
  }

  toLink = ()=>{
    //注销用户时清除相关本地存储
    localStorage.clear();
    console.log(this)
    this.props.history.push('login')
  }

  render(){
    return (
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">头部导航栏 1</Menu.Item>
          <Menu.Item key="2">头部导航栏 2</Menu.Item>
          <Menu.Item key="3">头部导航栏 3</Menu.Item>
        </Menu>
        <Button type='danger' className="logoutBtn" onClick={this.toLink}>注销</Button>
      </div>
    )
  }
}