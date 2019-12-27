import React, { Component } from 'react'
import { Layout, Menu } from 'antd'

export default class PageHeader extends Component {
  constructor(){
    super()
  }

  render(){
    return (
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
    )
  }
}