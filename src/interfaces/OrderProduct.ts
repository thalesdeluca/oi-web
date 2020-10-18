import BaseInterface from "./BaseInterface";
import Order from "./Order";
import Product from "./Product";

export default interface OrderProduct extends BaseInterface {
  id: number
  order_id: number
  product_id: number
  product: Product
  order: Order
  quantity: number
}