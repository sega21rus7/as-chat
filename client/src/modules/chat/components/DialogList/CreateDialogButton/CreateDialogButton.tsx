import React from "react";
import "./create_dialog_button.scss";
import { FormOutlined } from "@ant-design/icons";

interface IProps {
  openCreatePopup(): void;
}

const CreateDialogIcon: React.FC<IProps> = ({ openCreatePopup }) => {
  return (
    <div className="create-dialog-button">
      <FormOutlined onClick={openCreatePopup} />
    </div>
  );
};

export default CreateDialogIcon;