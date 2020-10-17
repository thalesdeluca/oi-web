import React from "react";
import {
  UserOutlined,
  BookOutlined,
  CoffeeOutlined,
  ShoppingOutlined
} from "@ant-design/icons";

export interface MenuItem {
  icon: object;
  name: string;
  to: string;
}

export const companyMenu: Array<MenuItem> = [
  {
    icon: <UserOutlined />,
    name: "Perfil",
    to: "/profile"
  },
  {
    icon: <CoffeeOutlined />,
    name: "Produtos",
    to: '/product'
  },
  {
    icon: <ShoppingOutlined />,
    name: "Pedidos",
    to: "order"
  },
];

export const adminMenu: Array<MenuItem> = [
  {
    icon: <BookOutlined />,
    name: "Categorias de Empresa",
    to: "/company-category"
  },
  {
    icon: <BookOutlined />,
    name: "Categorias de Produtos",
    to: "/product-category"
  },
];

