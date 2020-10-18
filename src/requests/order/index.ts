import { getToken } from '../../helpers/localStorage'

import api from '../../config/api'

const updateOrder = async ({ id, name, price }: { id: number, name: string, price: number }) => {
  const token = getToken()

  return api.put(`/orders/${id}`, {
    name,
    price
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteOrder = async ({ id }: { id: number }) => {
  const token = getToken()

  return api.delete(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getOwnOrders = async ({}: {}) => {
  const token = getToken()

  return api.get('/orders/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  getOwnOrders,
  deleteOrder,
  updateOrder
}
