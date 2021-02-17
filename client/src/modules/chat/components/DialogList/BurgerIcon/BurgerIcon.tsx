import React from "react";
import { useDispatch } from "react-redux";
import "./burger_icon.scss";
import { openDropdownMenu } from "store/dropdownMenu/actionCreators";

const BurgerIcon: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="burger-icon" onClick={() => dispatch(openDropdownMenu())}>
      <div className="burger-icon__body">
        <span />
      </div>
    </div >
  );
};

export default BurgerIcon;