import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Footer from '../components/layout/Footer.jsx';
import Lander from '../components/layout/Home';
import Header from '../components/layout/Header.jsx';
import Menu1 from './mapservice/MapService';
import Menu2 from './settings/Settings';
import Myrouter from '../router.js';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Myrouter/>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
