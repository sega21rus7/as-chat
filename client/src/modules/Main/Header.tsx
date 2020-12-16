import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { getObjectKeyByValue, isAuth } from "../../tools";

const { Header } = Layout;

interface ILinks {
  [key: string]: string
}

const CustomHeader: React.FC = () => {
  const location = useLocation();

  const linksIfAlreadyAuth: ILinks = {
    "Пользователи": "/admin/users",
  };
  const linksIfNotAuth: ILinks = {
    "Войти": "/login",
  };

  const links: ILinks = {
    "Главная": "/",
    ...(!isAuth() && linksIfNotAuth),
    ...(isAuth() && linksIfAlreadyAuth),
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