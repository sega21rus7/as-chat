import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const Main: React.FC = () => {
  const [component, setComponent] = React.useState(<Profile />);

  return (
    <Router>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={["change_password"]}
            defaultOpenKeys={["profile"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="user_profile"
              icon={<UserOutlined />}
              onClick={() => setComponent(<Profile />)}>
              Пользователь
            </Menu.Item>
            <SubMenu
              key="user_settings"
              icon={<SettingOutlined />}
              title="Настройки">
              <Menu.Item
                key="change_password"
                onClick={() => setComponent(<ChangePassword />)}>
                Изменить пароль
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{
            padding: 20,
            margin: 0,
            minHeight: 400,
          }}>
            {component}
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Main; 