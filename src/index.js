import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom';
import store from '@/Store/index'
import Router from '@/Router/index'
import './index.less'

ReactDom.render(
  <Provider {...store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);