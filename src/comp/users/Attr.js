import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'

const Attr = ({ attributes = {} }) => {
  const [form] = Form.useForm()

  const [formValue, setFormValue] = useState({})

  useEffect(() => {
    const formValue = {}
    Object.entries(attributes).forEach(([k, v = []]) => {
      formValue[k] = v.length > 0 ? v[0] : undefined
    })
    setFormValue(formValue)
    form.setFieldsValue(formValue)
  }, [attributes, form])

  // 只支持一个属性
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      layout='horizontal'
    >
      {Object.entries(formValue).map(([k, v = []]) => {
        return (
          <Form.Item key={k} name={k} label={k}>
            <Input />
          </Form.Item>
        )
      })}
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary' htmlType='submit'>
          提交
        </Button>
        <Button
          style={{ marginLeft: 16 }}
          onClick={() => {
            console.log(123)
          }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Attr
