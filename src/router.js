import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/layout/Home';
import MapService from './pages/mapservice/MapService';
import Settings from './pages/settings/Settings';

class router extends Component {
    render() {
        return ( 
        <div className="Router">
          <Route path='/' component={Home}></Route>
          <Route path='/mapservice' component={MapService}></Route>
          <Route path='/settings' component={Settings}></Route>
        </div>
    
        );
    }
}

export default router;
