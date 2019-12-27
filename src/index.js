import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom';
import store from '@/Store/index'
import WebPage from '@/Public/Layout/index'

ReactDom.render(
  <Provider {...store}>
    <HashRouter>
      <WebPage />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);