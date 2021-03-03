import React, { forwardRef, ForwardRefRenderFunction, FunctionComponent, useContext, useImperativeHandle, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { Form, Row, Col, Input, Button, Drawer, Space } from 'antd'

import StyledTitle from '../../../../components/StyledTitle'
import Notification from '../../../../helpers/notification'

import { CompanyCategoryContext } from '../../../../contexts/CompanyCategoryContext'
import { createCompanyCategory } from '../../../../requests'

const AddCompanyCategoryDrawer: ForwardRefRenderFunction<{ open(): void }> = ({ }, ref) => {
  const [form] = useForm()

  const [visible, setVisible] = useState<boolean>(false)

  const { companyCategories, setCompanyCategories } = useContext(CompanyCategoryContext)

  useImperativeHandle(ref, () => ({
    open
  }))

  const open = (): void => {
    setVisible(true)
  }

  const close = (): void => {
    setVisible(false)
    form.resetFields()
  }

  const onFinish = async (values: { name: string }) => {
    try {
      await createCompanyCategory({
        name: values.name
      })

      Notification.success('Sucesso', 'Categoria de empresa cadastrada com sucesso')

      close()
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  return (
    <Drawer
      visible={visible}
      closable={true}
      onClose={close}
      placement="right"
      title={<StyledTitle level={2}>Nova Categoria de Empresa</StyledTitle>}
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
        <Row>
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
      </Form>
    </Drawer>
  )
}

export default forwardRef(AddCompanyCategoryDrawer)
