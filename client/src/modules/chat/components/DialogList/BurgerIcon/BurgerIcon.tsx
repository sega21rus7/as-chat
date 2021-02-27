import React from "react";
import { useDispatch } from "react-redux";
import "./burger_icon.scss";
import { openMenu } from "store/burgerMenu/actionCreators";

interface PropsType {
  className: string;
}

const BurgerIcon: React.FC<PropsType> = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={["burger-icon", className].join(" ")} onClick={() => dispatch(openMenu())}>
      <div className="burger-icon__body">
        <span />
      </div>
    </div >
  );
};

export default BurgerIcon;