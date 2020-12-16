import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { getObjectKeyByValue } from "../../tools";

const { Header } = Layout;

interface ILinks {
  [key: string]: string
}

const CustomHeader: React.FC = () => {
  const location = useLocation();

  const links: ILinks = {
    "Главная": "/",
    "Войти": "/login",
    "Пользователи": "/users",
  };

  const renderedLinks = Object.keys(links).map(text => {
    return <Menu.Item key={text}>
      <Link to={links[text]}>
        {text}
      </Link>
    </Menu.Item>;
  });

  return <Header style={{
    marginBottom: 20,
  }}>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[getObjectKeyByValue(links, location.pathname)]}>
      {renderedLinks}
    </Menu>
  </Header>;
};

export default CustomHeader;