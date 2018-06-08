import { connect } from 'react-redux'
import { mapDispatchToProps } from './index'

export default mapStateToProps => {
  return connect(mapStateToProps, mapDispatchToProps)
}
