import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import Order from "../../../../interfaces/Order";
import Notification from '../../../../helpers/notification'
import ViewOrderModal from '../ViewOrderModal'

import { OrderContext } from "../../../../contexts/OrderContext";
import { getOwnOrders } from "../../../../requests";

const { Column } = Table

const OrderTable: FunctionComponent = () => {
  const viewOrderModal = useRef<{ open(order: Order): void }>(null)

  const { orders, setOrders } = useContext(OrderContext)

  const getData = async () => {
    try {
      const { data } = await getOwnOrders({})

      setOrders(data)
    } catch (error) {
      Notification.error('Erro', error.response.data.message)
    }
  }

  const openViewOrderModal = (order: Order): void => {
    viewOrderModal.current?.open(order)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Table<Order>
        dataSource={orders}
        rowKey={order => `${order.id}`}
      >
        <Column<Order> title="Pedido" dataIndex="id" key="id" />
        <Column<Order> title="Preço Total" dataIndex="total_price" key="total_price" />
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
