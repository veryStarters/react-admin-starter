import React from 'react'
import { Form } from 'antd'

const Item = Form.Item

export const formKit = Form.create

export const createForm = (props, formOpt) => {
  let { layout, onSubmit, formItems } = formOpt
  const { getFieldDecorator } = props.form
  return (
    <Form layout={layout} onSubmit={onSubmit}>
      {
        formItems.map((item) => {
          if (item.key === 'submit' || !item.key) {
            return (
              <Item key={'submit'} {...item.attrs || {}} >
                {item.component(props)}
              </Item>
            )
          }
          return (
            <Item key={item.key} {...item.attrs || {}}>
              {
                getFieldDecorator(item.key, {
                  ...item.option
                })(item.component(props))
              }
            </Item>
          )
        })
      }
    </Form>
  )
}
