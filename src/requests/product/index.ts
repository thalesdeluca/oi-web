import { getToken } from '../../helpers/localStorage'

import api from '../../config/api'

const createProduct = async ({ name, price }: { name: string, price: number }) => {
  const token = getToken()

  return api.post('/products', {
    name,
    price
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const updateProduct = async ({ id, name, price }: { id: number, name: string, price: number }) => {
  const token = getToken()

  return api.put(`/products/${id}`, {
    name,
    price
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteProduct = async ({ id }: { id: number }) => {
  const token = getToken()

  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getOwnProducts = async ({}: {}) => {
  const token = getToken()

  return api.get('/products/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  createProduct,
  getOwnProducts,
  deleteProduct,
  updateProduct
}
