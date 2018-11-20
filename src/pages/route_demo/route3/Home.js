import React from 'react'
import {Link} from 'react-router-dom'

export default class Home2 extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/test1">测试1</Link>
          </li>
          <li>
            <Link to="/test2">测试2</Link>
          </li>
        </ul>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}