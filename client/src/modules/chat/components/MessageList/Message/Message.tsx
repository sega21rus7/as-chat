/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./message.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import { UserType } from "tools/interfaces";
import Avatar from "../../Avatar/Avatar";
import { useSelector } from "tools/hooks";

interface PropsType {
  text: string;
  date: Date;
  user: UserType,
  hasRead?: boolean;
}

const Message: React.FC<PropsType> = ({ text, date, user, hasRead }) => {
  const userID = useSelector(state => state.auth.user?._id);
  const my = userID === user._id;

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
            {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocale })}
          </span>
          {my &&
            <span className="message__status">
              <MessageStatusIcon hasRead={hasRead} />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Message;