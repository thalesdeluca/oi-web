import React, { forwardRef, ForwardRefRenderFunction, FunctionComponent, useContext, useImperativeHandle, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { Form, Row, Col, Input, Button, Drawer, Space, InputNumber, Descriptions } from 'antd'

import StyledTitle from '../../../../components/StyledTitle'
import Notification from '../../../../helpers/notification'
import Order from '../../../../interfaces/Order'

import { OrderContext } from '../../../../contexts/OrderContext'
import { updateOrder } from '../../../../requests'
import { formatPriceToSave } from '../../../../helpers/formatters'
import Modal from 'antd/lib/modal/Modal'

const EditOrderDrawer: ForwardRefRenderFunction<{ open(orderId: number): void }> = ({ }, ref) => {
  const [form] = useForm()

  const [visible, setVisible] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>()
  const [orderId, setOrderId] = useState<number>()

  useImperativeHandle(ref, () => ({
    open
  }))

  const open = (orderId: number): void => {
    setVisible(true)
    setOrderId(orderId)
  }

  const close = (): void => {
    setVisible(false)
  }

  return (
    <Modal
      title={`Pedido: ${orderId}`}
      visible={visible}
    >
      <Row>
        <Col span={24}>
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>,
        </Col>
      </Row>
    </Modal>
  )
}

export default forwardRef(EditOrderDrawer)
