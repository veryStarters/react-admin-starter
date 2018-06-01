import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import propTypes from 'prop-types'

class EChart extends Component {
  constructor(props) {
    super(props)
    let domId = 'echart_' + setTimeout(0)
    this.state = {
      domId: domId,
      echart: null
    }
  }
  componentDidMount() {
    let dom = document.querySelector('#' + this.state.domId)
    let myEchart = echarts.init(dom)
    myEchart.setOption(this.props.option)
    this.setState({
      echart: myEchart
    })
  }
  componentWillReceiveProps(nextProps) {
    let { echart } = this.state
    if (!echart) {
      return
    }
    echart.setOption(nextProps.option)
    setTimeout(() => {
      echart.resize()
    }, 15)
  }
  componentWillUnmount() {
    this.state.echart.dispose()
  }
  render() {
    let { style, ...rest } = this.props
    style = Object.assign({
      width: '400px',
      height: '300px'
    }, style || {})
    return (
      <div {...rest} style = {style} id={this.state.domId} />
    )
  }
}

EChart.propStyle = {
  option: propTypes.object,
  style: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
  onMouseOver: propTypes.func,
  onMouseOut: propTypes.func
}

export default EChart
