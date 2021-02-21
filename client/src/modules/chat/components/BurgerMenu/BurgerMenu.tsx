import React from "react";
import { useDispatch } from "react-redux";
import "./burger_menu.scss";
import { closeMenu } from "store/burgerMenu/actionCreators";
import { useSelector } from "tools/hooks";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(state => state.burgerMenu.active);

  return (
    <div
      className={active ? "burger-menu burger-menu_active" : "burger-menu"}
      onClick={() => dispatch(closeMenu())}
    >
      {active && <div className="burger-menu__shade" />}
      <div className="burger-menu__body" onClick={e => e.stopPropagation()}>
        <div className="burger-menu__title">
          Алексей Медведев
        </div>
        <hr />
        <ul className="burger-menu__list">
          <li>Профиль</li>
          <li>Сменить пароль</li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;