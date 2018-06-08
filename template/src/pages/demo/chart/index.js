import React, { Component } from 'react'
import injectRedux from 'injectRedux'
import EChart from 'components/EChart'
import style from './index.pcss'

// 引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import { Button } from 'antd'

// 注入redux
@injectRedux(store => {
  return {
    appName: store.global.appName
  }
})
class DemoTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: '300px',
      height: '300px',
      option1: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        grid: {
          x: '50px',
          y: '50px'
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      option2: (() => {
        let data = []

        for (let i = 0; i <= 360; i++) {
          let t = i / 180 * Math.PI
          let r = Math.sin(2 * t) * Math.cos(2 * t)
          data.push([r, i])
        }
        return {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }],
          animationDuration: 2000
        }
      })()
    }
  }

  changeSize = () => {
    this.setState({
      width: '600px',
      height: '500px',
    })
  }

  changeContent = () => {
    this.setState({
      option1: {
        ...this.state.option1,
        title: {
          text: 'ECharts 变更头部'
        }
      }
    })
  }

  render() {
    let { width, height, option1, option2 } = this.state
    return (
      <div>
        <div className={style.main}>
          <EChart
            option={option1}
            className={'ras-echart'}
            style={{ width: width, height: height, border: '1px solid green', borderRadius: '10px', marginBottom: '20px' }}
          />
          <EChart
            option={option2}
            className={'ras-echart'}
            style={{ border: '1px solid red', borderRadius: '10px'
            }}
          />
        </div>
        <Button style={{ marginRight: '10px' }} onClick={this.changeSize}> 更改图表高度 </Button>
        <Button onClick={this.changeContent}> 更改图表内容 </Button>
      </div>
    )
  }
}

export default DemoTest
