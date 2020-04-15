import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Row,
  Col,
  Tree,
  Card,
  Tooltip,
  Button,
  Pagination,
  Input,
  message
} from 'antd'

import useGroups from '../../use/useGroups'
import { getGroups, getGroupsCount, deleteGroup } from '../../api/users'

import { QuestionCircleOutlined } from '@ant-design/icons'

import { putGroup } from '../../api/users'
import RealmGroupsTree from '../common/RealmGroupsTree'

const { TreeNode } = Tree

const generateUserTree = (treeNodes = [], checkKeys = []) => {
  return treeNodes.map(({ subGroups, ...props }) => (
    <TreeNode {...props} key={props.id} title={props.path}>
      {generateTree(subGroups, checkKeys)}
    </TreeNode>
  ))
}

const generateTree = (treeNodes = [], checkKeys = []) => {
  return treeNodes.map(({ subGroups, ...props }) => (
    <TreeNode
      {...props}
      disabled={checkKeys.includes(props.name)}
      key={props.id}
      title={props.name}
    >
      {generateTree(subGroups, checkKeys)}
    </TreeNode>
  ))
}

const GroupSetting = ({ id } = {}) => {
  const [leaveGroupsQuery, setLeaveGroupsQuery] = useState({
    first: 0,
    max: 20,
    search: undefined
  })

  const [userGroups, setUserGroups] = useState([])
  const [userAllGroups, setUserAllGroups] = useState([])
  const [userGroupsCount, setUserGroupsCount] = useState(0)
  const [currentLeaveKey, setCurrentLeaveKey] = useState()

  const onLoadUserGroups = useCallback(() => {
    getGroups(id, leaveGroupsQuery).then(data => {
      setUserGroups(data)
    })
    getGroupsCount(id, {
      search: leaveGroupsQuery.search
    }).then(data => {
      setUserGroupsCount(data.count)
    })
    getGroups(id).then(data => {
      setUserAllGroups(data)
    })
  }, [id, leaveGroupsQuery])

  useEffect(() => {
    onLoadUserGroups()
  }, [onLoadUserGroups])

  const checkKeys = useMemo(() => {
    const needCheckKeys = []
    new Set(
      userAllGroups
        .map(i => i.path)
        .map(path => path.split('/'))
        .flat()
    ).forEach(key => needCheckKeys.push(key))
    return needCheckKeys
  }, [userAllGroups])

  const onJoin = currectAvailableSelectKey => {
    if (currectAvailableSelectKey) {
      putGroup(id, currectAvailableSelectKey).then(_ => {
        message.success('加入成功')
        onLoadUserGroups()
      })
    } else {
      message.warn('请选择要加入的组')
    }
  }

  const onLeaveGroupSearch = search => {
    const nSearch = search.trim()
    setLeaveGroupsQuery(s => ({
      ...s,
      first: 0,
      search: nSearch.length > 0 ? nSearch : undefined
    }))
  }

  const onLeaveGroupsPageChange = page => {
    setLeaveGroupsQuery(({ search, max }) => ({
      max,
      search,
      first: (page - 1) * max
    }))
  }

  const onLeaveGroupsSelect = selectKeys => {
    setCurrentLeaveKey(selectKeys[0])
  }

  const onLeave = _ => {
    if (currentLeaveKey) {
      deleteGroup(id, currentLeaveKey).then(_ => {
        message.success('离开成功')
        setCurrentLeaveKey(undefined)
        onLoadUserGroups()
      })
    } else {
      message.warn('请选择要离开的组')
    }
  }

  return (
    <Row gutter={[12]}>
      <Col offset={4} span={6}>
        <Card
          title='所在角色组'
          extra={<Button onClick={onLeave}>离开</Button>}
        >
          <Input.Search
            style={{ marginBottom: 8 }}
            onSearch={onLeaveGroupSearch}
          />
          <Tree
            height={500}
            defaultExpandAll={true}
            selectable={true}
            blockNode
            onSelect={onLeaveGroupsSelect}
          >
            {generateUserTree(userGroups)}
          </Tree>
          <Pagination
            showQuickJumper
            current={leaveGroupsQuery.first / leaveGroupsQuery.max + 1}
            pageSize={leaveGroupsQuery.max}
            total={userGroupsCount}
            onChange={onLeaveGroupsPageChange}
            size='small'
            style={{ marginTop: 16, float: 'right' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <RealmGroupsTree join={onJoin} checkKeys={checkKeys} />
      </Col>
    </Row>
  )
}

export default GroupSetting
