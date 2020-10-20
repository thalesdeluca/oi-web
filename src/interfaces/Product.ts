import BaseInterface from "./BaseInterface";
import Image from "./Image";

export default interface Product extends BaseInterface {
  id: number;
  name: string;
  price: number;
  productImages: Image;
  product_category_id: number;
}
