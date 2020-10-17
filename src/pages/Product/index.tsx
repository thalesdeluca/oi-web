import React, { FunctionComponent, useRef } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import StyledTitle from '../../components/StyledTitle'
import ContentCard from '../../components/ContentCard'
import ContentHeader from '../../components/ContentHeader'
import ProductTable from './ProductTable'
import AddProductDrawer from './AddProductDrawer'

import ProductProvider from '../../contexts/ProductContext'

import './styles.scss'

const ProductPage: FunctionComponent = () => {
  const addProductDrawer = useRef<{ open(): void }>(null)

  const openAddProductDrawer = (): void => {
    addProductDrawer.current?.open()
  }

  return (
    <ProductProvider>
      <ContentHeader>
        <StyledTitle level={2}>Produtos</StyledTitle>

        <Button
          type="primary"
          onClick={() => openAddProductDrawer()}
        >
          <PlusOutlined /> Novo Produto
        </Button>
      </ContentHeader>

      <ContentCard>
        <ProductTable />
      </ContentCard>

      <AddProductDrawer ref={addProductDrawer} />
    </ProductProvider>
  )
}

export default ProductPage
