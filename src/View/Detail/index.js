import React, {Component} from 'react';
import './index.less'
import small_pic from 'img/small.jpg';
import { Button, Table, notification } from 'antd'
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react'
import Api from '@/Service/index'
import mModel from './model/index'
import { Bind } from 'components/Common-Library'

@observer
export default class Detail extends Component {
  constructor(){
    super()
    this.model = new mModel()
    this.bind = Bind.bind(this)
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
      render:(val,row,index)=>{
        let lab = val
        if(val || val === 0){
          lab = val == 0 ? "女" : "男"
        }
        return lab
      }
    },
    {
      title:'生日', 
      dataIndex:"birthday",
      key:"birthday",
      width:100,
      sorter: (r1,r2)=>r1.birthday-r2.birthday,
    },
    {
      title:'地址', 
      dataIndex:"adress",
      key:"adress",
      width:100,
      sorter: (r1,r2)=>r1.adress-r2.adress,
    },
  ]

  clickme = ()=>{
    console.log(this)
    this.count++
    console.log(this.count)
  }

  getData = async ()=>{
    //根据网友提供的接口请求数据
    const rtnmsg = await Api.get('home/get_students',{})
    console.log(rtnmsg)
    if(rtnmsg.rtncod == "success"){
      this.dataSource = [...rtnmsg.data.students]
      notification.success({message:"学生信息请求成功！"})
    }else{
      notification.error({message:"服务器请求失败！"})
    }
  }

  pageChange = (page, pageSize)=>{
    console.log(page)
    console.log(pageSize)
  }

  render(){
    return (
      <div>
        <h1 className='title'>Hello World</h1>
        <h2 className='title'>这是Detail组件</h2>
        <Button type="danger" onClick={this.clickme}>Click me {this.count}</Button>
        <a href='#/home'>回到 Home 组件</a>
        <Button type="danger" onClick={this.getData}>发送 Axios 请求</Button>
        <Table rowKey="inr" size="small"
          columns={this.dataHeader}
          dataSource={this.dataSource}
          pagination={{hideOnSinglePage:true,onChange:(page, pageSize)=>this.pageChange(page, pageSize)}}
        />
        <img src={small_pic} alt="" />
      </div>
    )
  }
}