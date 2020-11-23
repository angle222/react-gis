import React from 'react';
import ReactDOM from 'react-dom';

import "./css/gloable.less"
import './index.css';
import "./css/reset.css"
import "./assets/font/iconfont.css";

import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store/redux';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
