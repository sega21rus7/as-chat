import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./dialog_list_item.scss";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";

interface PropsType {
  user: {
    _id: string;
    firstName: string;
    secondName: string;
    avatar: string;
    online: boolean;
  },
  message: {
    text: string;
    count?: number;
  },
  date: Date | number;
  hadRead?: boolean;
}

const DialogListItem: React.FC<PropsType> = ({ user, message, date, hadRead }) => {
  return (
    <div className="dialog-list-item">
      <div className="dialog-list-item__avatar-wrapper">
        <div className="dialog-list-item__avatar">
          <img src={user.avatar} alt="" />
          {user.online && <div className="dialog-list-item__online" />}
        </div>
      </div>
      <div className="dialog-list-item__content">
        <div className="dialog-list-item__header">
          <div className="dialog-list-item__companion">
            {`${user.firstName} ${user.secondName}`}
          </div>
          <div className="dialog-list-item__date">
            {formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}
          </div>
        </div>
        <div className="dialog-list-item__footer">
          <div className="dialog-list-item__message">
            {message.text}
          </div>
          {
            message.count ?
              <div className="dialog-list-item__count">
                {message.count}
              </div>
              :
              <div className="dialog-list-item__status">
                <MessageStatusIcon hadRead={hadRead} />
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DialogListItem;