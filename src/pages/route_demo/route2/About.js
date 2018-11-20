import React from 'react'
import {Link} from 'react-router-dom'

export default class About extends React.Component{
  render() {
    return(
      <div>
        this is about
        <Link to="/about/main">Topics</Link>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}