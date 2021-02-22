import React from "react";
import "./message_status_icon.scss";
import hasReadIcon from "./assets/svg/has_read.svg";
import hasSendIcon from "./assets/svg/has_send.svg";

interface PropsType {
  hasRead?: boolean;
}

const MessageStatusIcon: React.FC<PropsType> = ({ hasRead }) => {
  return (
    <img src={hasRead ? hasReadIcon : hasSendIcon} alt="" />
  );
};

export default MessageStatusIcon;