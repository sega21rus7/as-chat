import React from "react";
import "./popup.scss";
import closeIcon from "./assets/svg/close.svg";

interface IProps {
  hide(): void;
  component: JSX.Element;
}

const Popup: React.FC<IProps> = ({ hide, component }) => {
  return (
    <div className="popup" onClick={hide}>
      <div className="popup__body">
        <div
          className="popup__content"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <img
            src={closeIcon}
            alt=""
            className="popup__close"
            onClick={hide}
          />
          {component}
        </div>
      </div>
    </div>
  );
};

export default Popup;