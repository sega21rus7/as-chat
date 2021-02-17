import React from "react";
import { useDispatch } from "react-redux";
import "./burger.scss";
import { openDropdownMenu } from "store/dropdownMenu/actionCreators";

const Menu: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="burger" onClick={() => dispatch(openDropdownMenu())}>
      <div className="burger__body">
        <span />
      </div>
    </div >
  );
};

export default Menu;