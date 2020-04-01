import React from 'react'
import { Form, Input, Switch, Select } from 'antd'

const Add = () => {
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} layout='horizontal'>
      <Form.Item label='ID'>
        <Input />
      </Form.Item>
      <Form.Item label='创建时间'>
        <Input />
      </Form.Item>
      <Form.Item label='用户名'>
        <Input />
      </Form.Item>
      <Form.Item label='电子邮箱'>
        <Input />
      </Form.Item>
      <Form.Item label='姓'>
        <Input />
      </Form.Item>
      <Form.Item label='名'>
        <Input />
      </Form.Item>
      <Form.Item label='是否可用a b'>
        <Switch />
      </Form.Item>

      <Form.Item label='验证电子邮箱'>
        <Switch />
      </Form.Item>
      <Form.Item label='用户需要操作'>
        <Select>
          <Select.Option value='1'>1</Select.Option>
          <Select.Option value='2'>2</Select.Option>
          <Select.Option value='3'>3</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export default Add
