import React, {
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "antd/lib/form/Form";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Drawer,
  Space,
  InputNumber,
  Upload,
  Select,
} from "antd";

import StyledTitle from "../../../../components/StyledTitle";
import Notification from "../../../../helpers/notification";

import { ProductContext } from "../../../../contexts/ProductContext";
import { createProduct } from "../../../../requests";
import { formatPriceToSave } from "../../../../helpers/formatters";
import { UploadOutlined } from "@ant-design/icons";
import { uploadProduct } from "../../../../requests/images";
import { ProductCategoryContext } from "../../../../contexts/ProductCategoryContext";

const AddProductDrawer: ForwardRefRenderFunction<{ open(): void }> = (
  { },
  ref
) => {
  const [form] = useForm();

  const [visible, setVisible] = useState<boolean>(false);

  const { products, setProducts, setPhoto, photo } = useContext(ProductContext);
  const { productCategories } = useContext(ProductCategoryContext);

  useImperativeHandle(ref, () => ({
    open,
  }));

  const open = (): void => {
    setVisible(true);
  };

  const close = (): void => {
    setVisible(false);
    setPhoto(null);
    form.resetFields();
  };

  const onFinish = async (values: {
    name: string;
    price: number;
    product_category_id: number;
  }) => {
    try {
      const { data } = await createProduct({
        name: values.name,
        price: formatPriceToSave(values.price),
        product_category_id: values.product_category_id,
      });

      const photoData = await changePhoto(photo, data?.id);
      data.productImages = photoData;
      setProducts([...products, data]);
      setPhoto(photoData);
      Notification.success("Sucesso", "Produto cadastrado com sucesso");

      close();
    } catch (error) {
      Notification.error("Erro", error.response.data.message);
    }
  };

  const changePhoto = async (img: any, id: string) => {
    const form = new FormData();

    form.append("image", img?.file?.originFileObj);
    form.append("productId", id);

    const { data } = await uploadProduct(form);
    if (data) {
      Notification.success("Sucesso", "Imagem salva com sucesso");
      return data;
    } else {
      Notification.success("Erro", "Erro ao enviar imagem");
    }
  };

  return (
    <Drawer
      visible={visible}
      closable={true}
      onClose={close}
      placement="right"
      title={<StyledTitle level={2}>Novo Produto</StyledTitle>}
      width={720}
      destroyOnClose={true}
      footer={
        <Space>
          <Button type="primary" onClick={() => form.submit()}>
            Criar
          </Button>
          <Button onClick={close}>Cancelar</Button>
        </Space>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={24}>
          <Col lg={{ span: "24" }}>
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: "Nome é obrigatório" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: "24" }}>
            <Form.Item label="Preço" name="price" rules={[{ required: true, message: "Preço é obrigatório" }]}>
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col lg={{ span: 24 }}>
            <Form.Item
              label="Categoria do Produto"
              name="product_category_id"
              rules={[{ required: true, message: "Categoria é obrigatório" }]}
            >
              <Select>
                {productCategories?.map((productCategory) => (
                  <Select.Option
                    key={productCategory.id}
                    value={productCategory.id}
                  >
                    {productCategory.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <img
              src={
                photo?.file?.originFileObj
                  ? URL.createObjectURL(photo?.file?.originFileObj)
                  : "https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png"
              }
              height={130}
              width={130}
            />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Upload onChange={(img) => setPhoto(img)} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Alterar Imagem</Button>
            </Upload>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default forwardRef(AddProductDrawer);
