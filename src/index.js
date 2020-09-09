import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom';
import store from '@/Store/index'
import Router from '@/Router/index'
import './index.less'

window.SUCCESS = '00000'  // 定义全局变量 用于判断请求的响应状态码

ReactDom.render(
  <Provider {...store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);