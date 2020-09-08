import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react'

import Layout from '@/Layout/index';

import Login from '@/View/Login/index';
import Home from '@/View/Home/index';
import Detail from '@/View/Detail/index';
import MyCheckbox from '@/View/MyCheckbox/index';


@observer
export default class Router extends Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log(this)
    return (
      <Switch>
        <Route exact path='/' render={()=><Login />} />
        <Route exact path='/login' render={()=><Login />} />

        <Route exact path='/home' render={(props)=> <Layout component={<Home {...props} />} />} />
        <Route exact path='/detail' render={(props)=> <Layout component={<Detail {...props} />} />} />
        <Route exact path='/checkbox' render={(props)=> <Layout component={<MyCheckbox {...props} />} />} />
        {/* <Route component={ NotFound } /> */}
      </Switch>
    )
  }
}