import React, { FunctionComponent, useContext } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { Card, Form, Row, Col, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { login } from '../../requests'
import { CompanyContext } from '../../contexts/CompanyContext'

import StyledTitle from '../../components/StyledTitle'
import Notification from '../../helpers/notification'

import './styles.scss'

const LoginPage: FunctionComponent = () => {
  const [form] = useForm()

  const { push } = useHistory()

  const { authenticate } = useContext(CompanyContext)

  const onFinish = async (values: { email: string, password: string }) => {
    try {
      const { data } = await login({
        email: values.email,
        password: values.password
      })

      authenticate(data.company, data.token)

      push('/company')

      Notification.success('Sucesso', 'Login efetuado com sucesso')
    } catch (error) {
      Notification.error('Erro', error.response.data.message)
    }
  }

  return (
    <div className="login-container">
      <Card
        title={<StyledTitle level={1}>Bem vindo ao Delivery!</StyledTitle>}
        className="login-card"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={'Email'}
                name={'email'}
                rules={[{
                  required: true,
                  message: 'Email é obrigatório'
                }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={'Senha'}
                name={'password'}
                rules={[{
                  required: true,
                  message: 'Senha é obrigatório'
                }]}
              >
                <Input type="password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Button
                type={'primary'}
                className={'submit-button'}
                onClick={() => form.submit()}
              >
                Entrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

    </div>
  )
}

export default LoginPage
