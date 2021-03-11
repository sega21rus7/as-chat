import React, { useState } from "react";
import "./burger_menu.scss";
import { useDispatch } from "react-redux";
import { Drawer } from "antd";
import { SettingOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import burgerMenuАctionCreators from "store/burgerMenu/actionCreators";
import { useSelector } from "tools/hooks";
import Avatar from "../Avatar/Avatar";
import { getFullName } from "tools";
import blackMoonImage from "./assets/svg/moon_black.svg";
import authАctionCreators from "store/auth/actionCreators";
import dialogsActionCreators from "store/dialogs/actionCreators";
import messagesActionCreators from "store/messages/actionCreators";
import ChangePasswordModal from "./ChangePasswordPopup/ChangePasswordPopup";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(state => state.burgerMenu.active);
  const user = useSelector(state => state.auth.user);
  const [changePasswordModalActive, setChangePasswordModalActive] = useState(false);

  const logout = () => {
    dispatch(burgerMenuАctionCreators.closeMenu());
    dispatch(messagesActionCreators.resetMessages());
    dispatch(dialogsActionCreators.setCurrentDialog(null));
    dispatch(authАctionCreators.logout());
  };

  const openChangePasswordPopup = () => {
    dispatch(burgerMenuАctionCreators.closeMenu());
    setChangePasswordModalActive(true);
  };
  const closeChangePasswordPopup = () => {
    setChangePasswordModalActive(false);
  };

  return (
    <React.Fragment>
      <Drawer
        className="burger-menu"
        placement="left"
        closable={false}
        onClose={() => dispatch(burgerMenuАctionCreators.closeMenu())}
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
            <li className="burger-menu-item" onClick={openChangePasswordPopup}>
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
            <li className="burger-menu-item" onClick={logout}>
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
      <ChangePasswordModal
        visible={changePasswordModalActive}
        hide={closeChangePasswordPopup}
      />
    </React.Fragment>
  );
};

export default BurgerMenu;