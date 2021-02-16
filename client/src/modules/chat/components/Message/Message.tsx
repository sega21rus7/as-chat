/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./message.scss";
import hadReadIcon from "./assets/svg/had_read.svg";
import hadSendIcon from "./assets/svg/had_send.svg";

interface PropsType {
  text: string;
  date: number | Date;
  avatar: string;
  my?: boolean;
  hadRead?: boolean;
}

const Message: React.FC<PropsType> = ({ text, date, avatar, my, hadRead }) => {
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
        <div className="message__footer">
          <span className="message__date">
            {formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}
          </span>
          {my &&
            <span className="message__status">
              <img src={hadRead ? hadReadIcon : hadSendIcon} alt="" />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Message;