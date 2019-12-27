import React, {Component} from 'react';
import {Button} from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'
import { withRouter } from 'react-router-dom';

@withRouter
@inject('UserContent')
@observer
export default class Login extends Component {
  constructor(){
    super()
  }

  toLogin = ()=>{
    this.props.history.push('home')
  }

  render(){
    return (
      <div className="loginStyle">
        <Button type='danger' onClick={this.toLogin}>登录</Button>
      </div>
    )
  }
}