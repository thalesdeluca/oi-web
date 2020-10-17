import api from '../../config/api'

const login = async ({ email, password }: { email: string, password: string }) => {
  return api.post('/companies/authenticate', {
    email,
    password
  })
}

export {
  login
}
