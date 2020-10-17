import React, { FunctionComponent, useState } from "react";

import Product from "../../interfaces/Product";

interface ProductContextInterface {
  products: Product[];
  setProducts: (product: Product[]) => void,
}

export const ProductContext = React.createContext<ProductContextInterface>({
  products: [],
  setProducts: () => null,
});

const ProductProvider: FunctionComponent = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
