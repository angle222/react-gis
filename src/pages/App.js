import React from 'react';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import './App.css';

import Footer from '../components/layout/Footer.jsx';
import Home from '../components/layout/Home';
import Header from '../components/layout/Header.jsx';
import Menu1 from './mapservice/MapService';
import Login from './login/Login';
// import Myrouter from '../router.js';
import MapService from './mapservice/MapService';
import Settings from './settings/Settings';
import MyView from './MyView/MyView';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path='/' component={Login}/>
            <MyView>
              <Route path='/mapservice' component={MapService}/>
              <Route path='/setting' component={Settings}/>
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
