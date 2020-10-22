import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import Order from "../../../../interfaces/Order";
import ViewOrderModal from '../ViewOrderModal'

import { OrderContext } from "../../../../contexts/OrderContext";
import { orderStatusObj } from "../../../../constants/orderStatus";

const { Column } = Table

const OrderTable: FunctionComponent = () => {
  const viewOrderModal = useRef<{ open(order: Order): void }>(null)

  const { orders } = useContext(OrderContext)

  const openViewOrderModal = (order: Order): void => {
    viewOrderModal.current?.open(order)
  }

  return (
    <>
      <Table<Order>
        dataSource={orders}
        rowKey={order => `${order.id}`}
      >
        <Column<Order> title="Pedido" dataIndex="id" key="id" />
        <Column<Order> title="Preço Total" dataIndex="total_price" key="total_price" />
        <Column<Order> title="Status" dataIndex="status" key="total_price" render={
          (value: 'waiting' | 'cancelled' | 'confirmed') => {
            return orderStatusObj[value]
          }
        } />
        <Column<Order>
          title="Ação"
          key="action"
          render={(text, order) => (
            <Space size="middle">
              <Button
                onClick={() => openViewOrderModal(order)}
              >
                <EyeOutlined />
              </Button>
            </Space>
          )}
        />
      </Table>

      <ViewOrderModal ref={viewOrderModal} />
    </>
  );
};

export default OrderTable;
