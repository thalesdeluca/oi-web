import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import Order from "../../../../interfaces/Order";
import Notification from '../../../../helpers/notification'
import EditOrderDrawer from '../EditOrderDrawer'
import ViewOrderModal from '../ViewOrderModal'

import { OrderContext } from "../../../../contexts/OrderContext";
import { getOwnOrders } from "../../../../requests";

const { Column } = Table

const OrderTable: FunctionComponent = () => {
  const editOrderDrawer = useRef<{ open(order: Order): void }>(null)
  const viewOrderModal = useRef<{ open(orderId: number): void }>(null)

  const { orders, setOrders } = useContext(OrderContext)

  const getData = async () => {
    try {
      const { data } = await getOwnOrders({})

      setOrders(data)
    } catch (error) {
      Notification.error('Erro', error.response.data.message)
    }
  }

  const openEditOrderDrawer = (order: Order): void => {
    editOrderDrawer.current?.open(order)
  }

  const openViewOrderModal = (orderId: number): void => {
    viewOrderModal.current?.open(orderId)
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
                onClick={() => openViewOrderModal(order.id)}
              >
                <EyeOutlined />
              </Button>
              <Button
                onClick={() => openEditOrderDrawer(order)}
              >
                <EditOutlined />
              </Button>
            </Space>
          )}
        />
      </Table>

      <EditOrderDrawer ref={editOrderDrawer} />
      <ViewOrderModal ref={viewOrderModal} />
    </>
  );
};

export default OrderTable;
