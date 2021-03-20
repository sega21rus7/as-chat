import React from "react";
import "./message_status_icon.scss";
import HasSendIcon from "./icons/HasSendIcon";
import HasReadIcon from "./icons/HasReadIcon";

interface IProps {
  hasRead?: boolean;
}

const MessageStatusIcon: React.FC<IProps> = ({ hasRead }) => {
  if (hasRead) {
    return <HasReadIcon />;
  }
  return <HasSendIcon />;
};

export default MessageStatusIcon;