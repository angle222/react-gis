import React from 'react';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import './App.css';

import Footer from '../components/layout/Footer.jsx';
import Login from './login/Login';
import Workspace from './mapservice/MapService';
import IconManage from './IconManage/IconManage';
import DataSource from './DataSource/DataSource';
import TokenGrant from './TokenGrant/TokenGrant';
import Privilege from './Privilege/Privilege';


import MyView from './MyView/MyView';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path='/' component={Login}/>
            <MyView>
              <Route path='/workspace' component={Workspace}/>
              <Route path='/iconManage' component={IconManage}/>
              <Route path='/dataSource' component={DataSource}/>
              <Route path='/tokenGrant' component={TokenGrant}/>
              <Route path='/privilege' component={Privilege}/>
            </MyView>
            <Redirect to="/login"></Redirect>
          </Switch>
          <Footer></Footer>
        </div>
        </Router>
    );
  }
}

export default App;
