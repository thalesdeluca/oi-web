import React, { FunctionComponent, useContext, useEffect } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import CompanyCategory from "../../../../interfaces/CompanyCategory";

import { CompanyCategoryContext } from "../../../../contexts/CompanyCategoryContext";
import { deleteCompanyCategory, getCompanyCategories } from "../../../../requests";

import Notification from '../../../../helpers/notification'

const { Column } = Table

const CompanyCategoryTable: FunctionComponent = () => {

  const { companyCategories, setCompanyCategories } = useContext(CompanyCategoryContext)

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

  const confirm = async (id: number) => {
    try {
      await deleteCompanyCategory({ id })

      setCompanyCategories(companyCategories.filter(companyCategory => companyCategory.id !== id))

      Notification.success('Sucesso', 'Categoria deletada com sucesso')
    } catch (error) {
      Notification.error('Erro', error?.response?.data?.message)
    }
  }

  return (
    <Table<CompanyCategory>
      dataSource={companyCategories}
      rowKey={companyCategory => `${companyCategory.id}`}
    >
      <Column<CompanyCategory> title="Categoria" dataIndex="name" key="name" />
      <Column<CompanyCategory>
        title="Ação"
        key="action"
        render={(text, companyCategory) => (
          <Space size="middle">
            <Popconfirm
              title="Deseja realmente deletar esta categoria?"
              onConfirm={() => confirm(companyCategory.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined />
              </Button>
            </Popconfirm>,
          </Space>
        )}
      />
    </Table>
  );
};

export default CompanyCategoryTable;
