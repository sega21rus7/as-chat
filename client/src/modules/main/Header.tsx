import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { getObjectKeyByValue, isAuth, removeToken } from "tools";
import { IKeyStringValueString } from "tools/interfaces";

const { Header } = Layout;

enum linkKeys {
  Users = "Пользователи",
  Login = "Войти",
  Out = "Выйти",
  Main = "Главная",
  Profile = "Профиль",
}

const CustomHeader: React.FC = () => {
  const location = useLocation();

  const linksIfAlreadyAuth: IKeyStringValueString = {
    [linkKeys.Profile]: "/profile",
    [linkKeys.Users]: "/admin/users",
    [linkKeys.Out]: "/",
  };
  const linksIfNotAuth: IKeyStringValueString = {
    [linkKeys.Login]: "/login",
  };

  const links: IKeyStringValueString = {
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

  return <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[getObjectKeyByValue(links, location.pathname)]}>
      {renderedLinks}
    </Menu>
  </Header>;
};

export default CustomHeader;