import BaseInterface from "./BaseInterface";
import OrderProduct from "./OrderProduct";
import User from "./User";

export default interface Order extends BaseInterface {
  id: number
  total_price: number
  shipping_price: number
  street: string
  district: string
  number?: number
  complement?: number
  city: string
  state: string
  zipcode: string
  order_products: OrderProduct[]
  status: 'waiting' | 'confirmed' | 'cancelled'
  user?: User
}