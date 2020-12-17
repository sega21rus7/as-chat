import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { getObjectKeyByValue, isAuth, removeToken } from "../../tools";

const { Header } = Layout;

interface ILinks {
  [key: string]: string
}

enum linkKeys {
  Users = "Пользователи",
  Login = "Войти",
  Out = "Выйти",
  Main = "Главная",
}

const CustomHeader: React.FC = () => {
  const location = useLocation();

  const linksIfAlreadyAuth: ILinks = {
    [linkKeys.Users]: "/admin/users",
    [linkKeys.Out]: "/",
  };
  const linksIfNotAuth: ILinks = {
    [linkKeys.Login]: "/login",
  };

  const links: ILinks = {
    [linkKeys.Main]: "/",
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

  const handleClick = (e: MenuInfo) => {
    if (e.key === linkKeys.Out) {
      removeToken();
    }
  };

  return <Header style={{
    marginBottom: 20,
  }}>
    <Menu
      theme="dark"
      mode="horizontal"
      onClick={handleClick}
      defaultSelectedKeys={[getObjectKeyByValue(links, location.pathname)]}>
      {renderedLinks}
    </Menu>
  </Header>;
};

export default CustomHeader;