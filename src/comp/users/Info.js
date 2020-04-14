import React, { useEffect, useState, useCallback } from 'react'
import { Form, Input, Switch, Select, Button, message } from 'antd'
import { postUser, getUser, putUser } from '../../api/users'

import moment from 'moment'
import useRealm from '../../use/useRealm'
import useRequiredActions from '../../use/useRequiredActions'

const Info = ({ id, onCencel, onAfterFinish, afterUpdateUser }) => {
  // 有 id 表示展示用户信息 并修改用户信息

  const requiredActions = useRequiredActions()

  const realm = useRealm()

  const [currentUser, setCurrentUser] = useState()

  const [form] = Form.useForm()

  useEffect(() => {
    if (afterUpdateUser) {
      afterUpdateUser(currentUser)
    }
  }, [afterUpdateUser, currentUser])

  const loadUser = useCallback(
    id => {
      getUser(id).then(data => {
        setCurrentUser(data)
        form.setFieldsValue(data)
      })
    },
    [form]
  )

  useEffect(() => {
    if (id) {
      loadUser(id)
    }
  }, [id, loadUser])

  const onFinish = value => {
    if (id) {
      setCurrentUser({ ...currentUser, ...value })
      putUser(id, { ...currentUser, ...value }).then(_ => {
        message.success('修改成功')
      })
    } else {
      postUser(value).then(_ => message.success('添加成功'))
    }
    if (onAfterFinish) {
      onAfterFinish()
    }
  }

  const onCencelClick = () => {
    form.resetFields()
    form.setFieldsValue(currentUser)
    if (onCencel) {
      onCencel()
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      layout='horizontal'
      onFinish={onFinish}
      initialValues={{ enabled: true }}
    >
      <Form.Item name='id' label='ID'>
        <Input disabled />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prev, next) => {
          return prev.id !== next.id
        }}
        label='创建时间'
      >
        {form => (
          <div>
            {moment(form.getFieldValue('createdTimestamp', 'x')).format(
              'YYYY:MM:DD hh:mm:ss'
            )}
          </div>
        )}
      </Form.Item>
      <Form.Item
        name='username'
        label='用户名'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input disabled={id && !realm.editUsernameAllowed} />
      </Form.Item>
      <Form.Item
        name='email'
        label='电子邮箱'
        rules={[{ message: '请输入正确的电子邮箱', type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='lastName' label='姓'>
        <Input />
      </Form.Item>
      <Form.Item name='firstName' label='名'>
        <Input />
      </Form.Item>
      <Form.Item name='enabled' label='是否可用' valuePropName='checked'>
        <Switch />
      </Form.Item>
      <Form.Item
        valuePropName='checked'
        name='emailVerified'
        label='验证电子邮箱'
      >
        <Switch />
      </Form.Item>
      <Form.Item name='requiredActions' label='用户需要操作'>
        <Select mode='multiple'>
          {requiredActions.map(i => (
            <Select.Option key={i.alias} value={i.alias}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary' htmlType='submit'>
          提交
        </Button>
        <Button style={{ marginLeft: 16 }} onClick={onCencelClick}>
          取消
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Info
