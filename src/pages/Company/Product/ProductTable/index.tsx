import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Product from "../../../../interfaces/Product";
import Notification from "../../../../helpers/notification";
import EditProductDrawer from "../EditProductDrawer";

import { ProductContext } from "../../../../contexts/ProductContext";
import { deleteProduct, getOwnProducts } from "../../../../requests";

const { Column } = Table;

const ProductTable: FunctionComponent = () => {
  const editProductDrawer = useRef<{ open(product: Partial<Product>): void }>(
    null
  );

  const { products, setProducts } = useContext(ProductContext);

  const getData = async () => {
    try {
      const { data } = await getOwnProducts({});

      setProducts(data);
    } catch (error) {
      Notification.error("Erro", error.response.data.message);
    }
  };

  const openEditProductDrawer = (product: Partial<Product>): void => {
    editProductDrawer.current?.open(product);
  };

  useEffect(() => {
    getData();
  }, []);

  const confirm = async (id: number) => {
    try {
      await deleteProduct({ id });

      setProducts(products.filter((product) => product.id !== id));

      Notification.success("Sucesso", "Produto deletado com sucesso");
    } catch (error) {
      Notification.error("Erro", error.response.data.message);
    }
  };

  return (
    <>
      <Table<Partial<Product>>
        dataSource={products}
        rowKey={(product) => `${product.id}`}
      >
        <Column<Partial<Product>> title="Produto" dataIndex="name" key="name" />
        <Column<Partial<Product>> title="Preço" dataIndex="price" key="price" />
        <Column<Partial<Product>>
          title="Ação"
          key="action"
          render={(text, product) => (
            <Space size="middle">
              <Button onClick={() => openEditProductDrawer(product)}>
                <EditOutlined />
              </Button>
              <Popconfirm
                title="Deseja realmente deletar este produto?"
                onConfirm={() => confirm(Number(product.id))}
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

      <EditProductDrawer ref={editProductDrawer} />
    </>
  );
};

export default ProductTable;
