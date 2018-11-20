import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Life from './pages/demo/Life';
// import Admin from './admin'
// import Home from './pages/route_demo/route1/Home'
// import IRouter from './pages/route_demo/route3/router'
import Router from './router'
import {Provider} from 'react-redux'
import configureStore from './redux/store/index'
import registerServiceWorker from './registerServiceWorker';
const store = configureStore() // 获取store工厂
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
