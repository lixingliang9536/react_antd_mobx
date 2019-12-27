import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '@/Business/Home/index';
import Detail from '@/Business/Detail/index';
// import NotFound from '@Business/NotFound/index';

export default class Router extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/home' component={ Home } />
        <Route exact path='/detail' component={ Detail } />
        {/* <Route component={ NotFound } /> */}
      </Switch>
    )
  }
}