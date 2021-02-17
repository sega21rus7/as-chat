import React from "react";
import { useDispatch } from "react-redux";
import "./dropdown_menu.scss";
import { closeDropdownMenu } from "store/dropdownMenu/actionCreators";
import { useSelector } from "tools/hooks";

const DropdownMenu: React.FC = () => {
  const dispatch = useDispatch();
  const active = useSelector(state => state.dropdownMenu.active);

  return (
    <div
      className={active ? "dropdown-menu dropdown-menu_active" : "dropdown-menu"}
      onClick={() => dispatch(closeDropdownMenu())}
    >
      {active && <div className="dropdown-menu__shade" />}
      <div className="dropdown-menu__body" onClick={e => e.stopPropagation()}>
        <div className="dropdown-menu__title">
          Алексей Медведев
        </div>
        <hr />
        <ul className="dropdown-menu__list">
          <li>Профиль</li>
          <li>Сменить пароль</li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;