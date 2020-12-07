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
import HomePage from './HomePage';
import PreviteRouter from './PreviteRouter';


import MyView from './MyView/MyView';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {/* <Route exact path='/' component={Login}/> */}
            
            <MyView>
            <Route path='/login' component={Login}/>
              <PreviteRouter path='/homePage' component={HomePage}/>
              {/* <Route path='/workspace' component={Workspace}/>
              <Route path='/iconManage' component={IconManage}/>
              <Route path='/dataSource' component={DataSource}/>
              <Route path='/tokenGrant' component={TokenGrant}/>
              <Route path='/privilege' component={Privilege}/>
              <Route path='/login' component={Login}/>
              <PreviteRouter path='/homePage' component={HomePage}/> */}
            </MyView>
            {/* <Redirect to="/login"></Redirect> */}
          </Switch>
          <Footer></Footer>
        </div>
        </Router>
    );
  }
}

export default App;
