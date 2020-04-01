import axios from '../plugin/axios'

// 查询用户信息
export const getUsers = query => axios.get('users', { params: query })

// 解锁用户
export const unLockUsers = _ =>
  axios.delete('attack-detection/brute-force/users')

export const deleteUser = id => axios.delete(`users/${id}`)
