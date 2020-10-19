import React, { FunctionComponent, useState } from "react";

import Product from "../../interfaces/Product";
import Image from "../../interfaces/Image";

interface ProductContextInterface {
  products: Partial<Product>[];
  setProducts: (product: Partial<Product>[]) => void;
  setPhoto: (productImage: Image) => void;
}

export const ProductContext = React.createContext<ProductContextInterface>({
  products: [],
  setProducts: () => null,
  setPhoto: (productImage: Image) => null,
});

const ProductProvider: FunctionComponent = ({ children }) => {
  const [products, setProducts] = useState<Partial<Product>[]>([]);

  const setPhoto = (profileImage: Image): void => {
    const cloneCompany = products;

    if (cloneCompany && profileImage) {
      //cloneCompany.profileImages = profileImage;
      //setProducts({ ...cloneCompany });
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, setPhoto }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
