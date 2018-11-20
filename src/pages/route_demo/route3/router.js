import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from './Main'
import Info from './Info'
import About from './About'
import Topics from './Topics'
import Home from './Home'
import NoMatch from './NoMatch'

export default class IRouter extends React.Component{
  render() {
    return(
      <Router>
        <Home>
          <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/about" render ={() =>
              <About>
                <Route path="/about/main/:id" component={Info}></Route>
              </About>
            }></Route>
            <Route path="/topics" component={Topics}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    )
  }
}