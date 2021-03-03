import React, { forwardRef, ForwardRefRenderFunction, useContext, useImperativeHandle, useState } from 'react'
import { Table, Row, Col, Button, Space, Descriptions } from 'antd'

import StyledTitle from '../../../../components/StyledTitle'
import Notification from '../../../../helpers/notification'
import Order from '../../../../interfaces/Order'
import OrderProduct from '../../../../interfaces/OrderProduct'
import Modal from 'antd/lib/modal/Modal'

import { OrderContext } from '../../../../contexts/OrderContext'
import { updateOrderStatus, getOwnOrders } from '../../../../requests'

const { Column } = Table

const ViewOrderModal: ForwardRefRenderFunction<{ open(order: Order): void }> = ({ }, ref) => {
  const { setOrders } = useContext(OrderContext)

  const [visible, setVisible] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>()
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>()

  useImperativeHandle(ref, () => ({
    open
  }))

  const open = (order: Order): void => {
    setVisible(true)
    setOrder(order)
    setOrderProducts(order.order_products)
  }

  const close = async (): Promise<void> => {
    setVisible(false)

    // Refetch query for orders
    try {
      const { data } = await getOwnOrders({})

      setOrders(data)
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  const cancel = async (): Promise<void> => {
    try {
      if (order) {
        await updateOrderStatus({ id: order?.id, status: "cancelled" })
      }

      Notification.success('Sucesso', 'Pedido cancelado com sucesso')

      await close()
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  const confirm = async (): Promise<void> => {
    try {
      if (order) {
        await updateOrderStatus({ id: order?.id, status: "confirmed" })
      }

      Notification.success('Sucesso', 'Pedido confirmado com sucesso')

      await close()
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  return (
    <Modal
      title={<StyledTitle level={3}>{`Pedido: ${order?.id}`}</StyledTitle>}
      visible={visible}
      destroyOnClose={true}
      width={720}
      onCancel={close}
      footer={
        <Space>
          {
            order?.status !== 'cancelled' && (
              <Button
                type="primary"
                danger
                onClick={() => cancel()}
              >
                Cancelar Pedido
              </Button>
            )
          }
          {
            order?.status === 'waiting' && (
              <Button
                type="primary"
                onClick={() => confirm()}
              >
                Aceitar Pedido
              </Button>
            )
          }
        </Space>
      }
    >
      <Row gutter={24}>
        <Col span={24}>
          <StyledTitle level={3}>Endereço</StyledTitle>
          <Descriptions style={{ marginTop: '10px' }}>
            <Descriptions.Item label="Rua">{order?.street}</Descriptions.Item>
            <Descriptions.Item label="Bairro">{order?.district}</Descriptions.Item>
            <Descriptions.Item label="Número">{order?.number}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{order?.complement}</Descriptions.Item>
            <Descriptions.Item label="Cidade">{order?.city}</Descriptions.Item>
            <Descriptions.Item label="Estado">{order?.state}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <StyledTitle level={3}>Produtos</StyledTitle>
          <Table<OrderProduct>
            dataSource={orderProducts}
            rowKey={orderProduct => `${orderProduct.id}`}
          >
            <Column<OrderProduct>
              title="Produto"
              dataIndex={["product", "name"]}
            />
            <Column<OrderProduct>
              title="Quantidade"
              dataIndex={"quantity"}
            />
          </Table>
        </Col>
      </Row>
    </Modal>
  )
}

export default forwardRef(ViewOrderModal)
