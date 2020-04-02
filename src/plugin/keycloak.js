import Keycloak from 'keycloak-js'

export const config = {
  url: 'http://localhost:8082/auth/',
  realm: 'test',
  clientId: 'security-admin-console'
}

const kec = new Keycloak(config)

export default kec
