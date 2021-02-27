import React from "react";
import "./create_dialog_icon.scss";
import createIcon from "./assets/svg/create.svg";

interface PropsType {
  openCreatePopup(): void;
  className: string;
}

const CreateDialogIcon: React.FC<PropsType> = ({ openCreatePopup, className }) => {
  return (
    <div className={["create-dialog-icon", className].join(" ")}>
      <img
        src={createIcon}
        alt=""
        className="create-dialog-icon__body"
        onClick={openCreatePopup} />
    </div>
  );
};

export default CreateDialogIcon;