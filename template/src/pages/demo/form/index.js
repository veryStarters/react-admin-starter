import React, { Component } from 'react'
import { Icon, Input, Button, Select, DatePicker } from 'antd'
import injectRedux from 'injectRedux'
import { formKit, createForm } from 'utils/formHelper'
import style from './index.pcss'

const Option = Select.Option

// 注入redux
@injectRedux(store => {
  return {
    appName: store.global.appName
  }
})
@formKit()
class DemoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'taoqili'
    }
  }

  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        alert(JSON.stringify(values))
      }
    })
  }

  render() {
    return (
      <div>
        <div className={style.title}>新用户注册</div>
        <div className={style.formWrapper}>
          {
            createForm(this.props, {
              onSubmit: this.handleSubmit,
              formItems: [
                {
                  key: 'username',
                  attrs: {
                    label: '用户名',
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 }
                  },
                  option: {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名'
                      }
                    ]
                  },
                  component: props => {
                    return (
                      <Input prefix={<Icon type='user' style={{ color: 'rgba(0, 0, 0, .25)' }}/>} placeholder='请输入用户名'/>
                    )
                  }
                },
                {
                  key: 'password',
                  attrs: {
                    label: '密　码',
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 }
                  },
                  option: {
                    rules: [
                      {
                        required: true,
                        message: '请使用数字、字母组合，且不低于7个字符'
                      }
                    ]
                  },
                  component: props => {
                    return (
                      <Input prefix={<Icon type='lock' style={{ color: 'rgba(0, 0, 0, .25)' }}/>} type={'password'} placeholder='请输入密码'/>
                    )
                  }
                },
                {
                  key: 'sex',
                  attrs: {
                    label: '性　别',
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 },
                  },
                  option: {
                    initialValue: '1',
                    rules: [
                      {
                        required: true,
                        message: '请选择性别'
                      }
                    ],
                  },
                  component: props => {
                    return (
                      <Select>
                        <Option value='1'>男</Option>
                        <Option value='2'>女</Option>
                      </Select>
                    )
                  }
                },
                {
                  key: 'birthday',
                  attrs: {
                    label: '生　日',
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 },
                  },
                  component: props => {
                    return (
                      <DatePicker style={{ width: '100%' }} />
                    )
                  }
                },
                {
                  attrs: {
                    wrapperCol: { span: 20, offset: 4 },
                  },
                  component: props => {
                    return (
                      <Button type="primary" htmlType="submit">注 册</Button>
                    )
                  }
                }
              ]
            })
          }
        </div>
      </div>
    )
  }
}

export default DemoForm
