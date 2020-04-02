import axios from '../plugin/axios'

export const getRequiredActions = () =>
  axios.get('authentication/required-actions')
