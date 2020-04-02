import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Table, Row, message, Form, Input, Button, Col } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { getUsers, unLockUsers, deleteUser, getCount } from '../../api/users'

const { Column } = Table
const { Search } = Input

const Users = () => {
  const initQuery = { first: 0, max: 10, search: undefined }

  const [users, setUsers] = useState([])

  const [search, setSearch] = useState(undefined)
  // 查询 page
  const [query, setQuery] = useState(initQuery)

  const [count, setCount] = useState(0)

  useEffect(() => {
    getCount({ search: query.search }).then(data => {
      setCount(data)
    })
  }, [query.search])

  // 搜索用户
  const onSearch = search => {
    setQuery(({ max }) => ({ first: 0, max, search }))
  }

  // 显示所有用户
  const onShowUsers = useCallback(() => {
    getUsers(query).then(data => {
      setUsers(data)
    })
  }, [query])

  useEffect(() => {
    onShowUsers()
  }, [onShowUsers])

  const onShowUsersAll = () => {
    setSearch(undefined)
    setQuery(initQuery)
  }

  // 解锁所有用户
  const onUnlockUsers = () => {
    unLockUsers().then(_ => {
      message.success('解锁全部用户成功')
    })
  }

  // 添加用户
  const onAddUser = () => {}

  // 删除用户
  const onDeleteUser = id => {
    Modal.confirm({
      title: `确定删除用户${id}`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteUser(id).then(_ => {
          message.success('删除成功')
          onShowUsers()
        })
      }
    })
  }

  // 页面改变
  const onPageChange = (page, pageSize) => {
    setQuery(({ max, search }) => ({
      first: (page - 1) * max,
      max: pageSize,
      search
    }))
  }

  // page size 改变
  const onShowSizeChange = (current, size) => {
    setQuery(({ search }) => ({
      first: 0,
      max: size,
      search
    }))
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row>
          <Col span={12}>
            <Form layout='inline'>
              <Form.Item>
                <Search
                  placeholder='搜索'
                  value={search}
                  onSearch={onSearch}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: 200 }}
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={onShowUsersAll}>查看所有用户</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Row justify='end'>
              <Form layout='inline'>
                <Form.Item>
                  <Button onClick={onUnlockUsers}>解锁用户</Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={onAddUser}>添加用户</Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <Table
          pagination={{
            total: count,
            pageSize: query.max,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: totle => `共${totle}条`,
            onChange: onPageChange,
            onShowSizeChange: onShowSizeChange
          }}
          dataSource={users}
          rowKey='id'
        >
          <Column
            width='200px'
            title='Id'
            dataIndex='id'
            render={id => <Button type='link'>{id}</Button>}
          ></Column>
          <Column title='用户名' dataIndex='username'></Column>
          <Column title='电子邮件' dataIndex='email'></Column>
          <Column title='姓' dataIndex='lastName'></Column>
          <Column title='名' dataIndex='firstName'></Column>
          <Column
            title='操作'
            width='200px'
            render={({ id }) => (
              <div>
                <Button>修改</Button>
                <Button onClick={_ => onDeleteUser(id)}>删除</Button>
              </div>
            )}
          ></Column>
        </Table>
      </div>
    </div>
  )
}

export default Users
