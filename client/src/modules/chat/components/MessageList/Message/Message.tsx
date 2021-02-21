/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./message.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import { UserType } from "modules/chat/interfaces";
import Avatar from "../../Avatar/Avatar";

interface PropsType {
  text: string;
  date: number | Date;
  user: UserType,
  my?: boolean;
  hadRead?: boolean;
}

const Message: React.FC<PropsType> = ({ text, date, user, my, hadRead }) => {
  return (
    <div className={my ? "message message_my" : "message"}>
      {!my &&
        <Avatar
          additionalClassNames={["message__avatar"]}
          user={user}
        />
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
              <MessageStatusIcon hadRead={hadRead} />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Message;