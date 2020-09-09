import React, {Component} from 'react';
import { Button, Input, Icon, Form } from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'
import { withRouter } from 'react-router-dom';
import logimg from 'img/logo1.png'
import Api from '@/Service/index'

const FromCreate = Form.create;

@FromCreate()
@withRouter
@inject('UserContent')
@observer
export default class Login extends Component {
  constructor(){
    super()
  }

  toLogin = ()=>{
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        let uname = values.uname
        let upwd = values.upwd
        const rtnmsg = await Api.post("login",{uname, upwd})
        if(rtnmsg.rtncod == "success"){
          localStorage.setItem("user_name",JSON.stringify(rtnmsg.data.uname))
          localStorage.setItem("token",JSON.stringify(rtnmsg.data.token))
          this.props.history.push('home')
        }else{
          console.log("登录失败，请重试！")
        }
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginStyle">
        <div className='login_contain'>
          <div className='login_title'>
            <img src={logimg} alt="logo" />
            <b>用户登录</b>
            <span>Login</span>
          </div>
          <Form onSubmit={this.toLogin}>
            <Form.Item>
              {getFieldDecorator('uname', {
                rules: [{ required: true, message: '用户名不可为空！' }],
                initialValue: "admin"
              })(
                <Input 
                  type='text' className='login_input'
                  placeholder="请输入用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('upwd', {
                rules: [{ required: true, message: '密码不可为空！' }],
                initialValue: "123456"
              })(
                <Input 
                  type='password' className='login_input'
                  placeholder="请输入密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" block className='login_btn' htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}