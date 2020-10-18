import BaseInterface from "./BaseInterface";
import Product from "./Product";

export default interface Order extends BaseInterface {
  id: number
  total_price: number
  shipping_price: number
  order_products: Product[]
}