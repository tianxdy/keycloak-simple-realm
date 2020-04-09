import axios from '../plugin/axios'

export const getClients = () => axios.get('/clients')
