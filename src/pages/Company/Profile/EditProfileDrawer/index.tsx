import React, { forwardRef, ForwardRefRenderFunction, useContext, useEffect, useImperativeHandle, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { Form, Row, Col, Input, Button, Drawer, Space, InputNumber, Select, Switch } from 'antd'

import { CompanyCategoryContext } from '../../../../contexts/CompanyCategoryContext'
import { editProfile, findCompanyById, getCompanyCategories } from '../../../../requests'
import { CompanyContext } from '../../../../contexts/CompanyContext'
import { formatPriceToSave } from '../../../../helpers/formatters'

import StyledTitle from '../../../../components/StyledTitle'
import Notification from '../../../../helpers/notification'
import { setCompanyToLocalStorage } from '../../../../helpers/localStorage'

const EditProfileDrawer: ForwardRefRenderFunction<{ open(): void }> = ({ }, ref) => {
  const [form] = useForm()

  const [visible, setVisible] = useState<boolean>(false)

  const { company, setCompany } = useContext(CompanyContext)
  const { companyCategories, setCompanyCategories } = useContext(CompanyCategoryContext)

  useImperativeHandle(ref, () => ({
    open
  }))

  const open = (): void => {
    setVisible(true)
  }

  const close = (): void => {
    setVisible(false)
    // form.resetFields()
  }

  const onFinish = async (values: {
    company_name: string,
    trading_name: string,
    phone_ddd: string,
    phone_number: string,
    cnpj: string,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
    complement: number,
    zipcode: string,
    company_category_id: number,
    has_delivery: boolean,
    delivery_price: number
  }) => {
    try {
      if (company?.id) {
        await editProfile({
          id: company?.id,
          company_name: values.company_name,
          trading_name: values.trading_name,
          phone_ddd: values.phone_ddd,
          phone_number: values.phone_number,
          cnpj: values.cnpj,
          street: values.street,
          number: values.number,
          district: values.district,
          city: values.city,
          state: values.state,
          complement: values.complement,
          zipcode: values.zipcode,
          company_category_id: values.company_category_id,
          has_delivery: values.has_delivery,
          delivery_price: formatPriceToSave(values.delivery_price)
        })

        const { data } = await findCompanyById({ id: company.id })

        setCompany(data)
        setCompanyToLocalStorage(data)

        Notification.success('Sucesso', 'Empresa editada com sucesso')

        close()
      }
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  const getData = async () => {
    try {
      const { data } = await getCompanyCategories({})

      setCompanyCategories(data)
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        company_name: company.company_name,
        trading_name: company.trading_name,
        phone_ddd: company.phone_ddd,
        phone_number: company.phone_number,
        cnpj: company.cnpj,
        street: company.street,
        number: company.number,
        district: company.district,
        city: company.city,
        state: company.state,
        complement: company.complement,
        zipcode: company.zipcode,
        company_category_id: company.company_category_id,
        has_delivery: company.has_delivery,
        delivery_price: company.delivery_price
      })
    }
  }, [company])

  return (
    <Drawer
      visible={visible}
      closable={true}
      onClose={close}
      placement="right"
      title={<StyledTitle level={2}>Editar Perfil</StyledTitle>}
      width={720}
      destroyOnClose={true}
      footer={
        <Space>
          <Button
            type="primary"
            onClick={() => form.submit()}
          >
            Editar
          </Button>
          <Button onClick={close}>Cancelar</Button>
        </Space>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Razão social"
              name="company_name"
              rules={[{ required: true, message: "Razão social é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Nome Fantasia"
              name="trading_name"
              rules={[{ required: true, message: "Nome fantasia é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '12' }}>
            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={[{ required: true, message: "CNPJ é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Categoria da Empresa"
              name="company_category_id"
              rules={[{ required: true, message: "Categoria é obrigatório" }]}
            >
              <Select>
                {
                  companyCategories.map(companyCategory => (
                    <Select.Option key={companyCategory.id} value={companyCategory.id}>
                      {companyCategory.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Possui delivery?"
              name="has_delivery"
              valuePropName="checked"
              rules={[{ required: false, message: "Possui delivery? é obrigatório" }]}
            >
              <Switch />
            </Form.Item>
          </Col>

          <Col lg={{ span: '12' }}>
            <Form.Item
              shouldUpdate={(currentValues, prevValues) => {
                return currentValues.has_delivery !== prevValues.has_delivery
              }}
            >
              {() => {
                if (form.getFieldValue('has_delivery') === true) {
                  return (
                    <Form.Item
                      label="Preço do delivery"
                      name="delivery_price"
                      rules={[{ required: false, message: "Preço do delivery é obrigatório" }]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ',')}
                        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  )
                }
              }}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '4' }}>
            <Form.Item
              label="DDD"
              name="phone_ddd"
              rules={[{ required: true, message: "DDD é obrigatório" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col lg={{ span: '20' }}>
            <Form.Item
              label="Celular"
              name="phone_number"
              rules={[{ required: true, message: "Celular é obrigatório" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <StyledTitle level={2}>Endereço</StyledTitle>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <Form.Item
              label="CEP"
              name="zipcode"
              rules={[{ required: true, message: "CEP é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <Form.Item
              label="Rua"
              name="street"
              rules={[{ required: true, message: "Rua é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '24' }}>
            <Form.Item
              label="Bairro"
              name="district"
              rules={[{ required: true, message: "Bairro é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Número"
              name="number"
              rules={[{ required: false }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Complemento"
              name="complement"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Estado"
              name="state"
              rules={[{ required: true, message: "Estado é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={{ span: '12' }}>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[{ required: true, message: "Cidade é obrigatório" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default forwardRef(EditProfileDrawer)
