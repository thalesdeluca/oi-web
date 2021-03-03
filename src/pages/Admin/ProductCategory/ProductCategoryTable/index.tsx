import React, { FunctionComponent, useContext, useEffect } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import ProductCategory from "../../../../interfaces/ProductCategory";

import { ProductCategoryContext } from "../../../../contexts/ProductCategoryContext";
import { deleteProductCategory, getProductCategories } from "../../../../requests";

import Notification from '../../../../helpers/notification'

const { Column } = Table

const ProductCategoryTable: FunctionComponent = () => {

  const { productCategories, setProductCategories } = useContext(ProductCategoryContext)

  const getData = async () => {
    try {
      const { data } = await getProductCategories({})

      setProductCategories(data)
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const confirm = async (id: number) => {
    try {
      await deleteProductCategory({ id })

      setProductCategories(productCategories.filter(productCategory => productCategory.id !== id))

      Notification.success('Sucesso', 'Categoria deletada com sucesso')
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  return (
    <Table<ProductCategory>
      dataSource={productCategories}
      rowKey={productCategory => `${productCategory.id}`}
    >
      <Column<ProductCategory> title="Categoria" dataIndex="name" key="name" />
      <Column<ProductCategory>
        title="Ação"
        key="action"
        render={(text, productCategory) => (
          <Space size="middle">
            <Popconfirm
              title="Deseja realmente deletar esta categoria?"
              onConfirm={() => confirm(productCategory.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
};

export default ProductCategoryTable;
