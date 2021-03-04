import React from "react";
import { useDispatch } from "react-redux";
import { Drawer } from "antd";
import { SettingOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import "./burger_menu.scss";
import { closeMenu } from "store/burgerMenu/actionCreators";
import { useSelector } from "tools/hooks";
import Avatar from "../Avatar/Avatar";
import { getFullName } from "tools";
import blackMoonImage from "./assets/svg/moon_black.svg";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(state => state.burgerMenu.active);
  const user = useSelector(state => state.auth.user);

  return (
    <div className="div">
      <Drawer
        className="burger-menu"
        placement="left"
        closable={false}
        onClose={() => dispatch(closeMenu())}
        visible={active}
        getContainer={false}
      >
        <div className="burger-menu__header">
          <div className="burger-menu__avatar">
            {user && <Avatar user={user} />}
          </div>
          <div className="burger-menu__title">
            {user && getFullName(user)}
          </div>
        </div>
        <div className="burger-menu__content">
          <div className="burger-menu__list">
            <li className="burger-menu-item">
              <div className="burger-menu-item__image-wrapper">
                <ProfileOutlined className="burger-menu-item__image" />
              </div>
              <p className="burger-menu-item__text">
                Профиль
              </p>
            </li>
            <li className="burger-menu-item">
              <div className="burger-menu-item__image-wrapper">
                <SettingOutlined className="burger-menu-item__image" />
              </div>
              <p className="burger-menu-item__text">
                Сменить пароль
              </p>
            </li>
            <li className="burger-menu-item">
              <div className="burger-menu-item__image-wrapper">
                <img className="burger-menu-item__image" src={blackMoonImage} alt="" />
              </div>
              <p className="burger-menu-item__text">
                Ночной режим
              </p>
            </li>
            <li className="burger-menu-item">
              <div className="burger-menu-item__image-wrapper">
                <LogoutOutlined className="burger-menu-item__image" />
              </div>
              <p className="burger-menu-item__text">
                Выйти
              </p>
            </li>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;