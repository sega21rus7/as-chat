import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["main"]}>
          <Menu.Item key="main">Главная</Menu.Item>
          <Menu.Item key="sign_in">Войти</Menu.Item>
        </Menu>
      </Header>
      <Content style={{
        padding: "20px 50px",
      }}>
        Content
      </Content>
    </Layout>
  );
};

export default App;
