/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./message.scss";

interface PropsType {
  text: string;
  date: number | Date;
  avatar: string;
  my: boolean;
}

const Message: React.FC<PropsType> = ({ text, date, avatar, my }) => {
  return (
    <div className={my ? "message message_my" : "message"}>
      {!my &&
        <div className="message__avatar">
          <img src={avatar} alt="" />
        </div>
      }
      <div className="message__content">
        <div className="message__bubble">
          <div className="message__text">
            {text}
          </div>
        </div>
        <div className="message__date">
          {formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}
        </div>
      </div>
    </div>
  );
};

export default Message;