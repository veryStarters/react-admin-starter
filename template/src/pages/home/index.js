import React, { Component } from 'react'
import storeKit from 'storeKit'
import echartOption from './echartOption'
import EChart from 'components/EChart'
import 'echarts/lib/chart/gauge'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: echartOption
    }
  }

  componentDidMount() {
    setInterval(() => {
      let option = {
        ...this.state.option
      }
      let series = option.series
      series.forEach(item => {
        item.data[0].value = (Math.random() * 10).toFixed(2)
      })
      this.setState({
        option: option
      })
    }, 800)
  }

  render() {
    let { option } = this.state
    return (
      <div style={{ height: '1000px' }}>
        Hello, world! {this.props.appName}
        <p>
          I <i style={{ color: 'red' }} className='icon heart'/> You!!
        </p>
        <EChart
          option={option}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    )
  }
}

export default Home
