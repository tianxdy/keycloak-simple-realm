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

// 域角色
export const getAssignedRoleMapping = id =>
  axios.get(`groups/${id}/role-mappings/realm`)

// 有效 角色
export const getEffectiveRoleMapping = id =>
  axios.get(`groups/${id}/role-mappings/realm/composite`)

// 可选择角色
export const getAvailableRoleMapping = id =>
  axios.get(`groups/${id}/role-mappings/realm/available`)

// 删除用户角色
export const deleteRoleMapping = (id, data) =>
  axios.delete(`groups/${id}/role-mappings/realm`, { data })

// 添加用户角色
export const postRoleMapping = (id, data) =>
  axios.post(`groups/${id}/role-mappings/realm`, data)

// 获取用户在客户端下的可用角色
export const getClientAssignedRoleMapping = (id, clientId) =>
  axios.get(`groups/${id}/role-mappings/clients/${clientId}`)

//   获取用户的有效角色
export const getClientEffectiveRoleMapping = (id, clientId) =>
  axios.get(`groups/${id}/role-mappings/clients/${clientId}/composite`)

// 获取用户可激活角色
export const getClientAvailableRoleMapping = (id, clientId) =>
  axios.get(`groups/${id}/role-mappings/clients/${clientId}/available`)

// 删除用户角色
export const deleteClientRoleMapping = (id, clientId, data) =>
  axios.delete(`groups/${id}/role-mappings/clients/${clientId}`, {
    data
  })

// 添加用户角色
export const postClientRoleMapping = (id, clientId, data) =>
  axios.post(`groups/${id}/role-mappings/clients/${clientId}`, data)
