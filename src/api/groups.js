import axios from '../plugin/axios'
import { config } from '../plugin/keycloak'

export const getGroups = query => axios.get('groups', { params: query })

export const getGroup = id => axios.get(`groups/${id}`)
// 获取数量
export const getCount = query => axios.get('groups/count', { params: query })

export const getDefaultGroups = _ => axios.get('default-groups')

export const putDefaultGroup = groupId =>
  axios.put(`default-groups/${groupId}`, { groupId, realm: config.realm })

export const deleteDefaultGroup = groupId =>
  axios.delete(`default-groups/${groupId}`)

export const postGroup = data => axios.post('/groups', data)

export const postChidrenGroup = (id, data) =>
  axios.post(`/groups/${id}/children`, data)

export const putGroup = (id, data) => axios.put(`groups/${id}`, data)
