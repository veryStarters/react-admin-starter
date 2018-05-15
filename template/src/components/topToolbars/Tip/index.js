import React from 'react'

/**
 * 最好放到外边去，此处仅为示例
 */
class Tip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handle = () => {
    alert('tip')
  }
  render() {
    return (
      <div onClick={this.handle}>
        <i className='icon setup' />Alert Tip
      </div>
    )
  }
}

export default Tip
