import React from "react";
import {
  UserOutlined,
  BookOutlined,
  CoffeeOutlined,
  PoweroffOutlined,
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
    icon: <BookOutlined />,
    name: "Categoria",
    to: "/category"
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
    icon: <UserOutlined />,
    name: "Perfil",
    to: "/profile"
  },
  {
    icon: <BookOutlined />,
    name: "Categorias de Empresa",
    to: "/company-category"
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

