import axios from '../plugin/axios'

// 查询用户信息
export const getUsers = query => axios.get('users', { params: query })
// 查询单个用户信息
export const getUser = id => axios.get(`users/${id}`)
// 添加用户
export const postUser = user => axios.post('users', user)
// 修改用户
export const putUser = (id, user) => axios.put(`users/${id}`, user)
// 得用搜索条件的用户总数
export const getCount = query => axios.get('users/count', { params: query })
// 解锁用户
export const unLockUsers = _ =>
  axios.delete('attack-detection/brute-force/users')

export const deleteUser = id => axios.delete(`users/${id}`)
