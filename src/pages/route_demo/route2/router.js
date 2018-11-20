import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topics from './Topics'
import Home from './Home'

export default class IRouter extends React.Component{
  render() {
    return(
      <Router>
        <Home>
          <Route path="/" exact component={Main}></Route>
          <Route path="/about" render ={() =>
            <About>
              <Route path="/about/main" component={Main}></Route>
            </About>
          }></Route>
          <Route path="/topics" component={Topics}></Route>
        </Home>
      </Router>
    )
  }
}