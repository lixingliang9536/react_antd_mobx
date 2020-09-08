import React, {Component} from 'react';
import { Row, Col, Button, Checkbox } from 'antd'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx';
import './index.less'
import { Bind } from 'components/Common-Library'
import mModel from './model/index'

const CheckboxGroup = Checkbox.Group

@inject('UserContent')
@observer
export default class MyCheckbox extends Component {
  
  checkboxList = [
    {
      label: "水果",
      value: "1",
      pnttyp: "",
    },
    {
      label: "苹果",
      value: "11",
      pnttyp: "1",
      isChecked: true
    },
    {
      label: "西瓜",
      value: "12",
      pnttyp: "1",
      isChecked: false
    },
    {
      label: "芒果",
      value: "13",
      pnttyp: "1",
      isChecked: false
    },
    {
      label: "葡萄",
      value: "14",
      pnttyp: "1",
      isChecked: true
    },
    {
      label: "香蕉",
      value: "15",
      pnttyp: "1",
      isChecked: true
    },
    {
      label: "柚子",
      value: "16",
      pnttyp: "1",
      isChecked: true
    },
    {
      label: "汽车",
      value: "2",
      pnttyp: "",
    },
    {
      label: "大众",
      value: "21",
      pnttyp: "2",
      isChecked: false
    },
    {
      label: "东风",
      value: "22",
      pnttyp: "2",
      isChecked: false
    },
    {
      label: "雪铁龙",
      value: "23",
      pnttyp: "2",
      isChecked: false
    },
    {
      label: "城市",
      value: "3",
      pnttyp: "",
    },
    {
      label: "北京",
      value: "31",
      pnttyp: "3",
      isChecked: true
    },
    {
      label: "上海",
      value: "32",
      pnttyp: "3",
      isChecked: false
    },
    {
      label: "武汉",
      value: "33",
      pnttyp: "3",
      isChecked: false
    },
    {
      label: "南宁",
      value: "34",
      pnttyp: "3",
      isChecked: true
    },
    {
      label: "成都",
      value: "35",
      pnttyp: "3",
      isChecked: false
    },
    {
      label: "杭州",
      value: "36",
      pnttyp: "3",
      isChecked: false
    },
    {
      label: "苏州",
      value: "37",
      pnttyp: "3",
      isChecked: false
    },
  ]

  @observable
  List = []

  constructor(props){
    super(props)
    this.model = new mModel()
    this.bind = Bind.bind(this)
    this.state = {
      indeterminate: {},
      checkedList: [],
      checkAll: {}
    }
  }

  componentDidMount(){
    // 处理数组，根据父级类型pnttyp 将子级集体放至父级的children数组
    this.checkboxList.map((item)=>{
      if(!item.pnttyp){
        // 新建对象 防止改变原数组
        let pntobj = {}
        pntobj.label = item.label
        pntobj.value = item.value
        pntobj.children = []
        this.checkboxList.map((obj)=>{
          obj.pnttyp == item.value && pntobj.children.push(obj)
        })
        this.List[pntobj.label] = pntobj
      }
    })

    // 处理默认选中项
    let indeterminate = {}
    let checkedList = []
    let checkAll = {}
    for(let key in this.List){
      let item = this.List[key].children
      checkedList[key] = []
      // isChecked为是否选中标识位 true(选中)
      item.map((obj)=>{
        if(obj.isChecked){
          checkedList[key].push(obj.value)
        }
      })
      indeterminate[key] = checkedList[key].length > 0 && checkedList[key].length < item.length
      checkAll[key] = checkedList[key].length == item.length

      // 更新状态数据触发页面渲染
      this.setState({
        indeterminate,
        checkedList,
        checkAll
      })
    }
  }

  // 全选
  onCheckedAll = (e, key, pnttyp)=>{
    // 获取当前相关状态属性
    let indeterminate = this.state.indeterminate
    let checkedList = this.state.checkedList
    let checkAll = this.state.checkAll

    // 修改状态属性
    indeterminate[key] = false
    checkAll[key] = e.target.checked
    let arr = []
    if(e.target.checked){
      this.List[key].children.map((item)=>{
        arr.push(item.value)
      })
    }
    checkedList[key] = arr

    // 更新原数组选项的选中状态 isChecked
    this.checkboxList.map((item)=>{
      if(item.pnttyp == pnttyp){
        // if(e.target.checked){
        //   item.isChecked = true
        // }else{
        //   item.isChecked = false
        // }
        item.isChecked = e.target.checked
      }
    })

    // 更新状态属性 页面重新渲染
    this.setState({
      indeterminate,
      checkedList,
      checkAll
    })
  }

  // 单选
  onChecked = (list, key, pnttyp)=>{
    // 获取当前相关状态属性
    let indeterminate = this.state.indeterminate
    let checkedList = this.state.checkedList
    let checkAll = this.state.checkAll

    // 修改状态属性
    indeterminate[key] = list.length > 0 && list.length < this.List[key].children.length
    checkedList[key] = list
    checkAll[key] = list.length == this.List[key].children.length

    // 更新原数组选项的选中状态 isChecked
    this.checkboxList.map((item)=>{
      if(item.pnttyp == pnttyp){
        // if(checkedList[key].includes(item.value)){
        //   item.isChecked = true
        // }else{
        //   item.isChecked = false
        // }
        item.isChecked = checkedList[key].includes(item.value)
      }
    })

    // 更新状态属性 页面重新渲染
    this.setState({
      indeterminate,
      checkedList,
      checkAll
    })
  }

  // 页面内容渲染方法
  getCheckboxGroup = ()=>{
    let html = [] // 用于存放JSX片段
    for(let key in this.List){
      let item = this.List[key]
      if(item.children && item.children.length > 0){
        html.push(
          <React.Fragment key={item.value}>
            <Row>
              <Col span={24}>
                <Checkbox
                  indeterminate={this.state.indeterminate[key]}
                  checked={this.state.checkAll[key]}
                  onChange={(e)=>{this.onCheckedAll(e, key, item.value)}}
                >
                  {item.label}
                </Checkbox>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                <CheckboxGroup
                  options={item.children}
                  value={this.state.checkedList[key]}
                  onChange={(list)=>{this.onChecked(list, key, item.value)}}
                />
              </Col>
            </Row>
            <br />
          </React.Fragment>
        )
      }
    }
    return html.map((jsx)=>jsx)
  }

  render(){
    return (
      <div>
        <Row style={{marginBottom:30}}>
          <Col span={24}>
            <p style={{fontSize:18, fontWeight:"bold"}}>带全选功能的多类别 CheckboxGroup 组件</p>
            <p style={{fontSize:18, fontWeight:"bold"}}>由 Antd 组件 CheckboxGroup 拓展而来</p>
          </Col>
        </Row>
        {
          this.getCheckboxGroup()
        }
      </div>
    )
  }
}