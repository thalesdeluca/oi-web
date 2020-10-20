import React, { FunctionComponent, useState } from "react";

import Product from "../../interfaces/Product";
import Image from "../../interfaces/Image";

interface ProductContextInterface {
  products: Partial<Product>[];
  setProducts: (product: Partial<Product>[]) => void;
  setPhoto: (productImage: any) => void;
  photo: any;
}

export const ProductContext = React.createContext<ProductContextInterface>({
  products: [],
  setProducts: () => null,
  setPhoto: (productImage: File) => null,
  photo: null,
});

const ProductProvider: FunctionComponent = ({ children }) => {
  const [products, setProducts] = useState<Partial<Product>[]>([]);
  const [photo, setPhoto] = useState<any>();

  return (
    <ProductContext.Provider value={{ products, setProducts, setPhoto, photo }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
