import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import PropStyles from 'prop-types'

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
    echart.setOption(nextProps.option)
    setTimeout(() => {
      echart.resize()
    }, 15)
  }
  componentWillUnmount() {
    this.state.echart.dispose()
  }
  render() {
    let { style, className } = this.props
    return (
      <div className={className} style = { Object.assign({ width: '400px', height: '300px' }, style || {}) } id={this.state.domId} />
    )
  }
}

EChart.propStyle = {
  option: PropStyles.object,
  style: PropStyles.string,
  className: PropStyles.string
}

export default EChart
