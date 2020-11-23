import React from 'react';
import { BrowserRouter as Router, Route,IndexRoute } from 'react-router-dom';
import './App.css';

import Footer from '../components/layout/Footer.jsx';
import Home from '../components/layout/Home';
import Header from '../components/layout/Header.jsx';
import Menu1 from './mapservice/MapService';
import Menu2 from './settings/Settings';
import Myrouter from '../router.js';
import MapService from './mapservice/MapService';
import Settings from './settings/Settings';
import Index from './home/Home';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Route path='/' component={Home}/>
          <Route path='/mapservice' component={MapService}/>
          <Route path='/setting' component={Settings}/>
          <Footer></Footer>
        </div>
        </Router>
    );
  }
}

export default App;
