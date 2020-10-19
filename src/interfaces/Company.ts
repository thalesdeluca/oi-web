import BaseInterface from "./BaseInterface";
import Image from "./Image";

export default interface Company extends BaseInterface {
  id: number;
  email: string;
  password: string;
  is_admin: boolean;
  trading_name: string;
  company_name: string;
  cnpj: string;
  phone_ddd: string;
  phone_number: string;
  street: string;
  district: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zipcode: string;
  has_delivery: boolean;
  delivery_price: number;
  company_category_id: number;
  profileImages: Image;
}
