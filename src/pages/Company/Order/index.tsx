import React, { FunctionComponent, useRef } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import ProductTable from './OrderTable'

import ProductProvider from '../../../contexts/ProductContext'

import './styles.scss'

const OrderPage: FunctionComponent = () => {

  return (
    <ProductProvider>
      <ContentHeader>
        <StyledTitle level={2}>Pedidos</StyledTitle>

      </ContentHeader>

      <ContentCard>
        <ProductTable />
      </ContentCard>
    </ProductProvider>
  )
}

export default OrderPage
