import React, { FunctionComponent, useState } from "react";

import Order from "../../interfaces/Order";

interface OrderContextInterface {
  orders: Order[];
  setOrders: (product: Order[]) => void,
}

export const OrderContext = React.createContext<OrderContextInterface>({
  orders: [],
  setOrders: () => null,
});

const OrderProvider: FunctionComponent = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
