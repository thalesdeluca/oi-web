import React, { useState } from "react";

interface Store {
  user: object;
  categories: Array<object>;
  products: Array<object>;
  orders: Array<object>;
  setStore: Function;
}

export const StoreContext = React.createContext<Partial<Store>>({});

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<Partial<Store>>({});

  return (
    <StoreContext.Provider value={{ ...store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
