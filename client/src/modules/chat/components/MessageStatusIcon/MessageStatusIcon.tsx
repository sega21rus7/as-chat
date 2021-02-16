import React from "react";
import "./message_status_icon.scss";
import hadReadIcon from "./assets/svg/had_read.svg";
import hadSendIcon from "./assets/svg/had_send.svg";

interface PropsType {
  hadRead?: boolean;
}

const MessageStatusIcon: React.FC<PropsType> = ({ hadRead }) => {
  return (
    <img src={hadRead ? hadReadIcon : hadSendIcon} alt="" />
  );
};

export default MessageStatusIcon;