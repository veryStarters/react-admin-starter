export default
`import React, { Component } from 'react'

class <%className%> extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        Hello, <%humpName%>!
      </div>
    )
  }
}

export default <%className%>
`
