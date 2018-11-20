import React from 'react'
import {Link} from 'react-router-dom'

export default class About extends React.Component{
  render() {
    return(
      <div>
        this is about
        <br/>
        <Link to="/about/main/test-id">嵌套路由1</Link>
        <br/>
        <Link to="/about/main/456">嵌套路由2</Link>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}