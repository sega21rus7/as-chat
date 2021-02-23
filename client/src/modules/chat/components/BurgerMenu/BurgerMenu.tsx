import React from "react";
import { useDispatch } from "react-redux";
import "./burger_menu.scss";
import { closeMenu } from "store/burgerMenu/actionCreators";
import { useSelector } from "tools/hooks";
import Avatar from "../Avatar/Avatar";
import moonSvg from "./assets/svg/moon.svg";
import settingsSvg from "./assets/svg/settings.svg";
import teamSvg from "./assets/svg/team.svg";
import { getFullName } from "tools";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(state => state.burgerMenu.active);
  const user = useSelector(state => state.auth.user);

  return (
    <div
      className={active ? "burger-menu burger-menu_active" : "burger-menu"}
      onClick={() => dispatch(closeMenu())}
    >
      {active && <div className="burger-menu__shade" />}
      <div className="burger-menu__body" onClick={e => e.stopPropagation()}>
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
            <li>
              <img src={teamSvg} alt="" />
              Создать чат
            </li>
            <li>
              <img src={settingsSvg} alt="" />
              Настройки
            </li>
            <li>
              <img src={moonSvg} alt="" />
              Ночной режим
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;