import React, { FunctionComponent, useContext, useEffect } from 'react'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import OrderTable from './OrderTable'
import Notification from '../../../helpers/notification'

import OrderProvider, { OrderContext } from '../../../contexts/OrderContext'
import { getOwnOrders } from "../../../requests";

import './styles.scss'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const OrderPage: FunctionComponent = () => {

  const { setOrders } = useContext(OrderContext)

  const getData = async () => {
    try {
      const { data } = await getOwnOrders({})

      setOrders(data)
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <ContentHeader>
        <StyledTitle level={2}>Pedidos</StyledTitle>
        <Button type="primary" onClick={async () => {
          await getData()
        }}>
          <PlusOutlined /> Atualizar Pedidos
        </Button>
      </ContentHeader>

      <ContentCard>
        <OrderTable />
      </ContentCard>
    </>
  )
}

export default OrderPage
