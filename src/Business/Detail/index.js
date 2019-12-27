import React, {Component} from 'react';
import './index.less'
import small_pic from 'img/small.jpg';
import { Button, Table } from 'antd'
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react'
import Axios from 'axios';

@observer
export default class Detail extends Component {
  constructor(){
    super()
  }

  @observable
  count = 0

  @observable
  dataSource = []

  dataHeader = [
    {
      title:'姓名', 
      dataIndex:"name",
      key:"name",
      width:100,
      sorter: (r1,r2)=>r1.name-r2.name,
    },
    {
      title:'年龄', 
      dataIndex:"age",
      key:"age",
      width:100,
      sorter: (r1,r2)=>r1.age-r2.age,
    },
    {
      title:'性别', 
      dataIndex:"sex",
      key:"sex",
      width:100,
      sorter: (r1,r2)=>r1.sex-r2.sex,
    },
  ]

  clickme = ()=>{
    console.log(this.props)
    this.count++
    console.log(this.count)
  }

  getData = ()=>{
    //根据网友提供的接口请求数据
    Axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists').then((result)=>{
      if(result.status == 200 && result.statusText == 'OK'){
        console.log(result.data)
        this.dataSource = [...result.data]
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  render(){
    return (
      <div>
        <h1 className='title'>Hello World</h1>
        <h2 className='title'>这是Detail组件</h2>
        <Button type="danger" onClick={this.clickme}>Click me {this.count}</Button>
        <a href='#/home'>回到 Home 组件</a>
        <Button type="danger" onClick={this.getData}>发送 Axios 请求</Button>
        <Table rowKey="id" size="small"
          columns={this.dataHeader}
          dataSource={this.dataSource}
          pagination={{hideOnSinglePage:true}}
        />
        <img src={small_pic} alt="" />
      </div>
    )
  }
}