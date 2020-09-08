import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';

const { SubMenu } = Menu;

const menuArr=[
  { group:'1', icon:'user', title:'侧边栏--01', item:['option1','option2','option3','option4'] },
  { group:'2', icon:'laptop', title:'侧边栏--02', item:['option1','option2','option3','option4'] },
  { group:'3', icon:'notification', title:'侧边栏--03', item:['option1','option2','option3'] },
  { group:'5', icon:'user', title:'侧边栏--04', item:['option1','option2','option3','option4'] },
  { group:'6', icon:'user', title:'侧边栏--05', item:['option1','option2','option3','option4'] },
  { group:'7', icon:'user', title:'侧边栏--06', item:['option1','option2','option3','option4'] },
]

@withRouter
export default class PageSider extends Component {
  constructor(props){
    super(props)
    this.state = {
      openKeys: []
    }
  }

  @observable
  idx = 0

  link = ({key})=>{
    this.props.history.push(key)
  }

  onOpenChange = (openKeys)=>{
    let lastKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    this.setState({
      openKeys: lastKey ? [lastKey] : []
    })
  }

  render(){
    return (
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: '100%', borderRight: 0, background:"#30363e" }}
        onClick={this.link}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='notification' />
              页面组件
            </span>
          }
        >
          <Menu.Item key='home'>
            Home组件
          </Menu.Item>
          <Menu.Item key='detail'>
            Detail组件
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='notification' />
              Antd 组件
            </span>
          }
        >
          <Menu.Item key='checkbox'>
            Checkbox组件
          </Menu.Item>
        </SubMenu>
        {
          menuArr.map((obj)=>{
            return (
              <SubMenu
                key={obj.group}
                title={
                  <span>
                    <Icon type={obj.icon} />
                    {obj.title}
                  </span>
                }
              >
                {
                  obj.item.map((itemobj)=>{
                    this.idx++
                    return (
                      <Menu.Item key={this.idx}>{itemobj}</Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    )
  }
}