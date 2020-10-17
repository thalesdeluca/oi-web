import { getToken } from '../../helpers/localStorage'

import api from '../../config/api'

const createCompanyCategory = ({ name }: { name: string}) => {
  const token = getToken()

  return api.post('/company-categories', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getCompanyCategories = ({}: {}) => {
  const token = getToken()

  return api.get('/company-categories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  createCompanyCategory,
  getCompanyCategories
}
