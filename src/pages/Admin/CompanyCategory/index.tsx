import React, { FunctionComponent, useRef } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import CompanyCategoryTable from './CompanyCategoryTable'
import AddCompanyCategoryDrawer from './AddCompanyCategoryDrawer'

import './styles.scss'
import CompanyCategoryProvider from '../../../contexts/CompanyCategoryContext'

const CompanyCategoryPage: FunctionComponent = () => {
  const addCompanyCategoryDrawer = useRef<{ open(): void }>(null)

  const openAddCompanyCategoryDrawer = (): void => {
    addCompanyCategoryDrawer.current?.open()
  }

  return (
    <CompanyCategoryProvider>
      <ContentHeader>
        <StyledTitle level={2}>Categorias de Empresa</StyledTitle>

        <Button
          type="primary"
          onClick={() => openAddCompanyCategoryDrawer()}
        >
          <PlusOutlined /> Nova Categoria de Empresa
        </Button>
      </ContentHeader>

      <ContentCard>
        <CompanyCategoryTable />
      </ContentCard>

      <AddCompanyCategoryDrawer ref={addCompanyCategoryDrawer} />
    </CompanyCategoryProvider>
  )
}

export default CompanyCategoryPage
