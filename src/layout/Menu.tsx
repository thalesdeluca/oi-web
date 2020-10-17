import * as React from "react";
import { Layout, Menu as AntMenu } from "antd";
import "./styles.scss";
import { MenuItem } from "./items";
const { Header, Content, Footer, Sider } = Layout;

interface MenuProps {
  routes: Array<MenuItem>;
  children: object;
}

const Menu: React.FC<MenuProps> = ({ routes, children }) => {
  return (
    <Layout>
      <Header
        className="header"
      >
        Delivery
      </Header>

      <Layout>
        <Sider className="site-layout-background sider">
          <AntMenu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            {routes.map(({ icon, name }, index) => (
              <AntMenu.Item key={index.toString()} icon={icon}>
                {name}
              </AntMenu.Item>
            ))}
          </AntMenu>
        </Sider>
      </Layout>
      <Layout className="site-layout">
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Menu;
