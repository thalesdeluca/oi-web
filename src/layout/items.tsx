import React from "react";
import {
  UserOutlined,
  BookOutlined,
  CoffeeOutlined,
  ShoppingFilled,
} from "@ant-design/icons";

export interface MenuItem {
  icon: object;
  name: string;
}

export const authMenu: Array<MenuItem> = [
  {
    icon: <UserOutlined />,
    name: "Perfil",
  },
  {
    icon: <BookOutlined />,
    name: "Categoria",
  },
  {
    icon: <CoffeeOutlined />,
    name: "Produtos",
  },
  {
    icon: <ShoppingFilled />,
    name: "Pedidos",
  },
];
