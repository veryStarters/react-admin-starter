import React from 'react'
import check from '../check'
import propTypes from 'prop-types'

const emptyFn = function () {
}

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let {
      authName,
      children,
      onReject = emptyFn,
      onAccept = emptyFn,
      preventDefault = false
    } = this.props

    if (check(authName)) {
      onAccept()
      return children
    }
    if (preventDefault) {
      return onReject()
    } else {
      onReject()
      return null
    }
  }
}
Auth.propTypes = {
  authName: propTypes.string,
  children: propTypes.object,
  onReject: propTypes.func,
  onAccept: propTypes.func,
  preventDefault: propTypes.bool,
}

export default Auth
