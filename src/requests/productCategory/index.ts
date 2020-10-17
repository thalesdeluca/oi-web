import { getToken } from '../../helpers/localStorage'

import api from '../../config/api'

const createProductCategory = ({ name }: { name: string}) => {
  const token = getToken()

  return api.post('/product-categories', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteProductCategory = ({ id }: { id: number }) => {
  const token = getToken()

  return api.delete(`/product-categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getProductCategories = ({}: {}) => {
  const token = getToken()

  return api.get('/product-categories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  createProductCategory,
  getProductCategories,
  deleteProductCategory
}
