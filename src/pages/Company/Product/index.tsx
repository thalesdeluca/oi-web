import React, { FunctionComponent, useRef, useContext, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import StyledTitle from "../../../components/StyledTitle";
import ContentCard from "../../../components/ContentCard";
import ContentHeader from "../../../components/ContentHeader";
import ProductTable from "./ProductTable";
import AddProductDrawer from "./AddProductDrawer";

import ProductProvider from "../../../contexts/ProductContext";

import "./styles.scss";
import { getProductCategories } from "../../../requests";
import { ProductCategoryContext } from "../../../contexts/ProductCategoryContext";
import Notification from "../../../helpers/notification";

const ProductPage: FunctionComponent = () => {
  const addProductDrawer = useRef<{ open(): void }>(null);
  const { setProductCategories } = useContext(ProductCategoryContext);

  const openAddProductDrawer = (): void => {
    addProductDrawer.current?.open();
  };

  const getData = async () => {
    try {
      const { data } = await getProductCategories({});

      setProductCategories(data);
    } catch (error) {
      Notification.error("Erro", error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductProvider>
      <ContentHeader>
        <StyledTitle level={2}>Produtos</StyledTitle>

        <Button type="primary" onClick={() => openAddProductDrawer()}>
          <PlusOutlined /> Novo Produto
        </Button>
      </ContentHeader>

      <ContentCard>
        <ProductTable />
      </ContentCard>

      <AddProductDrawer ref={addProductDrawer} />
    </ProductProvider>
  );
};

export default ProductPage;
