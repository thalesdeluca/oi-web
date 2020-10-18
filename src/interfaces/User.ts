import BaseInterface from "./BaseInterface";

export default interface User extends BaseInterface {
  id?: number
  email: string
  name: string
}