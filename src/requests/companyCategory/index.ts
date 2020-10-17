import { getToken } from '../../helpers/localStorage'

import api from '../../config/api'

const createCompanyCategory = async ({ name }: { name: string}) => {
  const token = getToken()

  return api.post('/company-categories', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteCompanyCategory = async ({ id }: { id: number }) => {
  const token = getToken()

  return api.delete(`/company-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getCompanyCategories = async ({}: {}) => {
  const token = getToken()

  return api.get('/company-categories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  createCompanyCategory,
  getCompanyCategories,
  deleteCompanyCategory
}
