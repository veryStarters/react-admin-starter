import React, { Component } from 'react'
import { Collapse, Row, Col } from 'antd'
import style from './style.pcss'

const Panel = Collapse.Panel

class CollapsePanel extends Component {
  static getCol(data, index, blockNum) {
    let newData = data[index - 1]
    if (newData) {
      return (
        <Col span={blockNum} key={index}>
          <span>{newData['key']}</span>
          <span>：</span>
          <span>{newData['value']}</span>
        </Col>
      )
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      text: 'aaaa'
    }
  }

  render() {
    const colNum = this.props.col || 3
    const title = this.props.title
    const data = this.props.data || []
    const rowNum = Math.ceil((data && data.length) / colNum)
    const blockNum = Math.floor(24 / colNum)
    let index = 0
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      overflow: 'hidden',
    }
    const collapsedStyle = {
      border: 0,
      backgroundColor: '#fff'
    }
    return (
      <div className={style.collapse}>
        <Collapse defaultActiveKey={['1']} style={collapsedStyle}>
          <Panel header={title} key='1' style={customPanelStyle}>
            {
              Array.from({ length: rowNum }).map((item, rowIndex) => {
                return (
                  <Row className={style.item} key={rowIndex}>
                    {
                      Array.from({ length: colNum }).map((item, colIndex) => {
                        index++
                        return CollapsePanel.getCol(data, index, blockNum)
                      })
                    }
                  </Row>
                )
              })
            }
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default CollapsePanel
