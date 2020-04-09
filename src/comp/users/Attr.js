import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'

import config from '../../config/keycloakConfig'

const { userAttrLabel } = config

const Attr = ({ attributes = {}, onFinish }) => {
  const [form] = Form.useForm()

  const [formValue, setFormValue] = useState({})

  useEffect(() => {
    const formValue = {}
    console.log(attributes)

    Object.entries(attributes).forEach(([k, v = []]) => {
      formValue[k] = v.length > 0 ? v[0] : undefined
    })
    setFormValue(formValue)
    form.setFieldsValue(formValue)
  }, [attributes, form])

  const onFormFinish = values => {
    if (onFinish) {
      const realAttr = { ...formValue, ...values }
      setFormValue(realAttr)
      const saveAttr = {}
      Object.entries(realAttr).forEach(([k, v = []]) => {
        saveAttr[k] = [v]
      })
      onFinish(saveAttr)
    }
  }

  const onCencel = () => {
    form.setFieldsValue(formValue)
  }
  // 只支持一个属性
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      layout='horizontal'
      onFinish={onFormFinish}
    >
      {Object.entries(userAttrLabel).map(([k, v = []]) => {
        return (
          <Form.Item key={k} name={k} label={v}>
            <Input />
          </Form.Item>
        )
      })}

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary' htmlType='submit'>
          提交
        </Button>
        <Button style={{ marginLeft: 16 }} onClick={onCencel}>
          取消
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Attr
