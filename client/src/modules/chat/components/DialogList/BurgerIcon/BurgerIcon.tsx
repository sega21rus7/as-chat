import React from "react";
import { useDispatch } from "react-redux";
import "./burger_icon.scss";
import { openMenu } from "store/burgerMenu/actionCreators";

const BurgerIcon: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="burger-icon" onClick={() => dispatch(openMenu())}>
      <div className="burger-icon__body">
        <span />
      </div>
    </div >
  );
};

export default BurgerIcon;