import React, { Component } from 'react'
import injectRedux from 'injectRedux'
import option1 from './echarts/option1'
import EChart from 'components/EChart'
import 'echarts/lib/chart/gauge'

// 注入redux
@injectRedux(store => {
  return {
    appName: store.global.appName
  }
})
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: option1
    }
  }

  onMouseOver = () => {
    // console.log('mouse over')
  }
  onMouseOut = () => {
    // console.log('mouse out')
  }
  change = () => {
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
  }

  render() {
    let { option } = this.state
    return (
      <div>
        <p style={{ lineHeight: 3 }}>
          I <i style={{ color: 'red' }} className='icon heart'/> You!! (PS: 点击下，指针会动哦！)
        </p>
        <EChart
          option={option}
          style={{ width: '100%', height: '400px' }}
          onClick={this.change}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
      </div>
    )
  }
}

export default Home
