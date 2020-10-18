import api from '../../config/api'
import { getToken } from '../../helpers/localStorage'

const login = async ({ email, password }: { email: string, password: string }) => {
  return api.post('/companies/authenticate', {
    email,
    password
  })
}

const findCompanyById = async ({ id }: { id: number }) => {
  const token = getToken()

  return api.get(`/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const register = async ({ 
  company_name,
  trading_name,
  password,
  email,
  phone_ddd,
  phone_number,
  cnpj,
  street,
  number,
  district,
  city,
  state,
  complement,
  zipcode,
  company_category_id,
  has_delivery,
  delivery_price
}: { 
  company_name: string,
  trading_name: string,
  password: string,
  email: string,
  phone_ddd: string,
  phone_number: string,
  cnpj: string,
  street: string,
  number: number,
  district: string,
  city: string,
  state: string,
  complement: number,
  zipcode: string,
  company_category_id: number,
  has_delivery: boolean,
  delivery_price: number
}) => {
  return api.post('/companies', {
    company_name,
    trading_name,
    password,
    email,
    phone_ddd,
    phone_number,
    cnpj,
    street,
    number,
    district,
    city,
    state,
    complement,
    zipcode,
    company_category_id,
    has_delivery,
    delivery_price
  })
}

const editProfile = async ({ 
  id,
  company_name,
  trading_name,
  phone_ddd,
  phone_number,
  cnpj,
  street,
  number,
  district,
  city,
  state,
  complement,
  zipcode,
  company_category_id,
  has_delivery,
  delivery_price
}: { 
  id: number,
  company_name: string,
  trading_name: string,
  phone_ddd: string,
  phone_number: string,
  cnpj: string,
  street: string,
  number: number,
  district: string,
  city: string,
  state: string,
  complement: number,
  zipcode: string,
  company_category_id: number,
  has_delivery: boolean,
  delivery_price: number
}) => {
  const token = getToken()

  return api.put(`/companies/${id}`, {
    company_name,
    trading_name,
    phone_ddd,
    phone_number,
    cnpj,
    street,
    number,
    district,
    city,
    state,
    complement,
    zipcode,
    company_category_id,
    has_delivery,
    delivery_price
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export {
  login,
  register,
  editProfile,
  findCompanyById
}
