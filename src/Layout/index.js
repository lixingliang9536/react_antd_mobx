import React, { Component } from 'react'
import { Layout } from 'antd'; 
import PageHeader from './Header'
import PageSider from './SideMenu'
import PageContainer from './Container'
import './index.less'

const { Header, Content, Sider } = Layout;

export default class WebPage extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <Layout style={{background:'#f5f5f5',height:'100%'}}>
        <Header>
          <PageHeader />
        </Header>
        <Layout>
          <Sider width={200} style={{background:'#fff',height: '100vh',position: 'fixed', overflow: 'auto'}}>
            <PageSider />
          </Sider>
          <Content style={{background:'#fff', padding:20, margin:10,marginLeft:210}}>
            {/* 把路由匹配到的业务组件作为参数传给 PageContainer 组件使其在我们设想的位置展现 */}
            <PageContainer router={this.props.component} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}