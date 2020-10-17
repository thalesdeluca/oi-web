import BaseInterface from "./BaseInterface";

export default interface Product extends BaseInterface {
  id: number
  name: string
  price: number
}