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
      option.series[0].data[0].value = (Math.random() * 100).toFixed(2)
      option.series[1].data[0].value = (Math.random() * 7).toFixed(2)
      option.series[2].data[0].value = (Math.random() * 2).toFixed(2)
      option.series[3].data[0].value = (Math.random() * 2).toFixed(2)
      this.setState({
        option: option
      })
    }, 1000)
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
