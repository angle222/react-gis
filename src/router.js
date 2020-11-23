import React, { Component } from 'react';
import { Route,IndexRoute } from 'react-router-dom';

import Home from './components/layout/Home';
import MapService from './pages/mapservice/MapService';
import Settings from './pages/settings/Settings';

class router extends Component {
    render() {
        return ( 
        <div className="Router">
          <Route path='/' component={Home}>
            <IndexRoute component={Home}/>
            <Route path='mapservice' component={MapService}/>
            <Route path='setting' component={Settings}/>
          </Route>
          
        </div>
    
        );
    }
}

export default router;
