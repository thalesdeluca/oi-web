import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { Button, Row, Col, Descriptions } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'

import { CompanyContext } from '../../../contexts/CompanyContext'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import CompanyCategoryProvider from '../../../contexts/CompanyCategoryContext'
import EditProfileDrawer from './EditProfileDrawer'

const ProfilePage: FunctionComponent = () => {
  const editProfileDrawer = useRef<{ open(): void }>(null)

  const openEditProfileDrawer = (): void => {
    editProfileDrawer.current?.open()
  }

  const { company } = useContext(CompanyContext)

  return (
    <CompanyCategoryProvider>
      <ContentHeader>
        <StyledTitle level={2}>Perfil da Empresa</StyledTitle>

        <Button
          type="primary"
          onClick={() => openEditProfileDrawer()}
        >
          <EditOutlined /> Editar Perfil
        </Button>
      </ContentHeader>

      <ContentCard>
        <Row gutter={24}>
          <Col span={24}>
            <StyledTitle level={3}>Empresa</StyledTitle>
            <Descriptions style={{ marginTop: '10px' }}>
              <Descriptions.Item label="Razão Social">{company?.trading_name}</Descriptions.Item>
              <Descriptions.Item label="Nome Fantasia">{company?.company_name}</Descriptions.Item>
              <Descriptions.Item label="CNPJ">{company?.cnpj}</Descriptions.Item>
              <Descriptions.Item label="DDD">{company?.phone_ddd}</Descriptions.Item>
              <Descriptions.Item label="Número">{company?.phone_number}</Descriptions.Item>
              <Descriptions.Item label="Email">{company?.email}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <StyledTitle level={3}>Endereço</StyledTitle>
            <Descriptions style={{ marginTop: '10px' }}>
              <Descriptions.Item label="Rua">{company?.street}</Descriptions.Item>
              <Descriptions.Item label="Bairro">{company?.district}</Descriptions.Item>
              <Descriptions.Item label="Número">{company?.number}</Descriptions.Item>
              <Descriptions.Item label="Complemento">{company?.complement}</Descriptions.Item>
              <Descriptions.Item label="Cidade">{company?.city}</Descriptions.Item>
              <Descriptions.Item label="Estado">{company?.state}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </ContentCard>

      <EditProfileDrawer ref={editProfileDrawer} />
    </CompanyCategoryProvider>
  )
}

export default ProfilePage
