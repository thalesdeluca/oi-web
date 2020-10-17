import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import CompanyCategory from "../../../interfaces/CompanyCategory";

import { CompanyCategoryContext } from "../../../contexts/CompanyCategoryContext";
import { getCompanyCategories } from "../../../requests";

import Notification from '../../../helpers/notification'

const { Column } = Table

const CompanyCategoryTable: FunctionComponent = () => {

  const { companyCategories, setCompanyCategories } = useContext(CompanyCategoryContext)

  const getData = async () => {
    try {
      const { data } = await getCompanyCategories({})

      setCompanyCategories(data)
    } catch (error) {
      Notification.error('Erro', error.response.data.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Table<CompanyCategory> dataSource={companyCategories}>
      <Column<CompanyCategory> title="Categoria" dataIndex="name" key="name" />
      <Column<CompanyCategory>
        title="Ação"
        key="action"
        render={(text, companyCategory) => (
          <Space size="middle">
            <Button>
              <EditOutlined />
            </Button>
            <Button>
              <DeleteOutlined />
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default CompanyCategoryTable;
