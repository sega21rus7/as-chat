import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ProfileRouter from "./routes";
import { Layout, Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const Profile: React.FC = () => {
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
            <Menu.Item key="user_profile" icon={<UserOutlined />}>
              <Link to="/profile">
                Пользователь
              </Link>
            </Menu.Item>
            <SubMenu key="user_settings" icon={<SettingOutlined />} title="Настройки">
              <Menu.Item key="change_password">
                <Link to="/profile/change_password">
                  Изменить пароль
                </Link>
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
            <ProfileRouter />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Profile; 