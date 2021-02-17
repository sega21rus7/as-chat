import React from "react";
import { useDispatch } from "react-redux";
import "./dropdown_menu.scss";
import { closeDropdownMenu } from "store/dropdownMenu/actionCreators";

const DropdownMenu: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="dropdown-menu" onClick={() => dispatch(closeDropdownMenu())}>
      <div className="dropdown-menu__blur" />
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