import React, { FunctionComponent, useState } from "react";

import ProductCategory from "../../interfaces/ProductCategory";

interface ProductCategoryContextInterface {
  productCategories: ProductCategory[];
  setProductCategories: (productCategories: ProductCategory[]) => void,
}

export const ProductCategoryContext = React.createContext<ProductCategoryContextInterface>({
  productCategories: [],
  setProductCategories: () => null,
});

const ProductCategoryProvider: FunctionComponent = ({ children }) => {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  return (
    <ProductCategoryContext.Provider value={{ productCategories, setProductCategories }}>
      {children}
    </ProductCategoryContext.Provider>
  );
};

export default ProductCategoryProvider;
