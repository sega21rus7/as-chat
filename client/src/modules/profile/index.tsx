import React from "react";
import { Layout, Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import ErrorIfNotAuth from "tools/wrapperComponents/ErrorIfNotAuth";
import ChangePassword from "./ChangePasswordForm";
import Profile from "./Profile";

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const Main: React.FC = () => {
  const [component, setComponent] = React.useState(<Profile />);

  return (
    <ErrorIfNotAuth>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["user_profile"]}
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
    </ErrorIfNotAuth>
  );
};

export default Main; 