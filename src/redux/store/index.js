/*
* 引入createStore  // 创建数据源对象store
* */

import {createStore} from 'redux'
import reducer from './../reducer'  // 创建工厂
// import {composeWithDevTools} from 'redux-devtools-extension' // 调试工具

// export default () => createStore(reducer, composeWithDevTools())
export default () => createStore(reducer)