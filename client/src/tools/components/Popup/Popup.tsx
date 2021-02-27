import React from "react";
import "./popup.scss";
import closeIcon from "./assets/svg/close.svg";

interface PropsType {
  hide(): void;
}

const Popup: React.FC<PropsType> = ({ hide }) => {
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
          <div className="popup__title">Тест</div>
          <div className="popup__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae sint dolores. Ea praesentium eaque iusto cumque. Reiciendis tempora molestiae quod impedit debitis quisquam et quaerat. Voluptas cupiditate aspernatur modi.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;