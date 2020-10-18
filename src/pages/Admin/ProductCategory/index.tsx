import React, { FunctionComponent, useRef } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import StyledTitle from '../../../components/StyledTitle'
import ContentCard from '../../../components/ContentCard'
import ContentHeader from '../../../components/ContentHeader'
import ProductCategoryTable from './ProductCategoryTable'
import AddProductCategoryDrawer from './AddProductCategoryDrawer'

import ProductCategoryProvider from '../../../contexts/ProductCategoryContext'

import './styles.scss'

const ProductCategoryPage: FunctionComponent = () => {
  const addProductCategoryDrawer = useRef<{ open(): void }>(null)

  const openAddProductCategoryDrawer = (): void => {
    addProductCategoryDrawer.current?.open()
  }

  return (
    <ProductCategoryProvider>
      <ContentHeader>
        <StyledTitle level={2}>Categorias de Produto</StyledTitle>

        <Button
          type="primary"
          onClick={() => openAddProductCategoryDrawer()}
        >
          <PlusOutlined /> Nova Categoria de Produto
        </Button>
      </ContentHeader>

      <ContentCard>
        <ProductCategoryTable />
      </ContentCard>

      <AddProductCategoryDrawer ref={addProductCategoryDrawer} />
    </ProductCategoryProvider>
  )
}

export default ProductCategoryPage
