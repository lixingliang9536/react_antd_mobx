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
  }

  @observable
  idx = 0

  link = ({key})=>{
    this.props.history.push(key)
  }

  render(){
    return (
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub']}
        style={{ height: '100%', borderRight: 0, background:"#30363e" }}
        onClick={this.link}
      >
        <SubMenu
          key='sub'
          title={
            <span>
              <Icon type='notification' />
              页面组件
            </span>
          }
        >
          <Menu.Item key='Home'>
            Home组件
          </Menu.Item>
          <Menu.Item key='Detail'>
            Detail组件
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