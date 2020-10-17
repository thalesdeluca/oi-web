import React, { useContext } from "react";
import { Layout, Menu as AntMenu, } from "antd";
import { useHistory } from "react-router-dom";
import { DisconnectOutlined, UserOutlined, } from "@ant-design/icons";

import { MenuItem } from "./items";
import { CompanyContext } from "../contexts/CompanyContext";

import "./styles.scss";

const { Header, Content, Sider } = Layout;

interface MenuProps {
  routes: Array<MenuItem>;
  children: object;
}

const Menu: React.FC<MenuProps> = ({ routes, children }) => {
  const { push, replace } = useHistory()
  const { company, logout } = useContext(CompanyContext)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <p className="sider-header">Delivery</p>
        <AntMenu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          {routes.map(({ icon, name, to }, index) => (
            <AntMenu.Item
              key={index.toString()}
              icon={icon}
              onClick={() => push(to)}
            >
              {name}
            </AntMenu.Item>
          ))}
        </AntMenu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background header">
          <AntMenu theme="dark" mode="horizontal" className={"header-menu"}>
            <AntMenu.SubMenu
              key="SubMenu"
              icon={<UserOutlined />}
              title={company?.company_name || "Empresa"}
            >
              <AntMenu.Item
                icon={<DisconnectOutlined />}
                key="logout"
                onClick={() => {
                  logout()

                  replace('/login')
                }}
              >
                Logout
              </AntMenu.Item>
            </AntMenu.SubMenu>
          </AntMenu>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Menu;
