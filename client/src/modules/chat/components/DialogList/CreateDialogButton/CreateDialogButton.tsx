import React from "react";
import "./create_dialog_button.scss";
import { MessageOutlined } from "@ant-design/icons";

interface PropsType {
  openCreatePopup(): void;
}

const CreateDialogIcon: React.FC<PropsType> = ({ openCreatePopup }) => {
  return (
    <div className="create-dialog-button">
      <MessageOutlined onClick={openCreatePopup} />
    </div>
  );
};

export default CreateDialogIcon;