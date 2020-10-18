import React, { forwardRef, ForwardRefRenderFunction, FunctionComponent, useContext, useImperativeHandle, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { Form, Row, Col, Input, Button, Drawer, Space, InputNumber } from 'antd'

import StyledTitle from '../../../../components/StyledTitle'
import Notification from '../../../../helpers/notification'
import Order from '../../../../interfaces/Order'

import { OrderContext } from '../../../../contexts/OrderContext'
import { updateOrder } from '../../../../requests'
import { formatPriceToSave } from '../../../../helpers/formatters'

const EditOrderDrawer: ForwardRefRenderFunction<{ open(order: Order): void }> = ({ }, ref) => {
  const [form] = useForm()

  const [visible, setVisible] = useState<boolean>(false)
  const [order, setOrder] = useState<Order>()

  const { orders, setOrders } = useContext(OrderContext)

  useImperativeHandle(ref, () => ({
    open
  }))

  const open = (order: Order): void => {
    setVisible(true)
    setOrder(order)

    // form.setFieldsValue({
    //   name: order.name,
    //   price: order.price
    // })
  }

  const close = (): void => {
    setVisible(false)
    form.resetFields()
  }

  const onFinish = async (values: { name: string, price: number }) => {
    try {
      if (order) {
        // await updateOrder({
        //   id: order.id,
        //   name: values.name,
        //   price: formatPriceToSave(values.price)
        // })

        // setOrders(orders.map(currentOrder => {
        //   if (currentOrder.id === order.id) {
        //     return {
        //       id: order.id,
        //       name: values.name,
        //       price: values.price
        //     }
        //   }

        //   return currentOrder
        // }))

        Notification.success('Sucesso', 'Produto editado com sucesso')

        close()
      }
    } catch (error) {
      Notification.error('Erro', error.response.data.message)
    }
  }

  return (
    <Drawer
      visible={visible}
      closable={true}
      onClose={close}
      placement="right"
      title={<StyledTitle level={2}>Novo Produto</StyledTitle>}
      width={720}
      destroyOnClose={true}
      footer={
        <Space>
          <Button
            type="primary"
            onClick={() => form.submit()}
          >
            Criar
          </Button>
          <Button onClick={close}>Cancelar</Button>
        </Space>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <Form.Item
              label="Preço"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default forwardRef(EditOrderDrawer)
