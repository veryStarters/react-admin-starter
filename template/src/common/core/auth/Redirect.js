import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Redirector extends Component {
  render() {
    return (
      <Redirect to="/error/forbidden"/>
    )
  }
}
export default Redirector
