import React, { FunctionComponent } from 'react'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import OrderTable from './OrderTable'

import OrderProvider from '../../../contexts/OrderContext'

import './styles.scss'

const OrderPage: FunctionComponent = () => {

  return (
    <OrderProvider>
      <ContentHeader>
        <StyledTitle level={2}>Pedidos</StyledTitle>

      </ContentHeader>

      <ContentCard>
        <OrderTable />
      </ContentCard>
    </OrderProvider>
  )
}

export default OrderPage
