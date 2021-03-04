import React from "react";
import "./create_dialog_button.scss";
import { FormOutlined } from "@ant-design/icons";

interface PropsType {
  openCreatePopup(): void;
}

const CreateDialogIcon: React.FC<PropsType> = ({ openCreatePopup }) => {
  return (
    <div className="create-dialog-button">
      <FormOutlined onClick={openCreatePopup} />
    </div>
  );
};

export default CreateDialogIcon;