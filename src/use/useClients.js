import { useState, useEffect } from 'react'
import { getClients } from '../api/clients'

import config from '../config/keycloakConfig'

const { clientsLabel } = config

const useClients = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    getClients().then(data => {
      const needClients = data
        .filter(client => clientsLabel[client.clientId])
        .map(client => ({ ...client, label: clientsLabel[client.clientId] }))
      setClients(needClients)
    })
  }, [])
  return clients
}

export default useClients
