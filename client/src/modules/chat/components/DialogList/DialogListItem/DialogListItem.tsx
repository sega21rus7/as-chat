import React from "react";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import "./dialog_list_item.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import { UserType } from "modules/chat/interfaces";
import Avatar from "../../Avatar/Avatar";

interface PropsType {
  user: UserType,
  message: {
    text: string;
    count?: number;
  },
  date: Date;
  hasRead?: boolean;
}

const DialogListItem: React.FC<PropsType> = ({ user, message, date, hasRead }) => {
  const getFullName = () => {
    // {`${user.firstName} ${user.lastName}`}
    let res = "";
    if (user.firstName || user.lastName) {
      res = `${user.firstName || ""} ${user.lastName || ""}`;
    }
    return res || user.login;
  };

  return (
    <div className="dialog-list-item">
      <div className="dialog-list-item-avatar dialog-list-item__avatar">
        <Avatar
          additionalClassNames={["dialog-list-item-avatar__body"]}
          user={user}
          additionalJSX={<div className="dialog-list-item__online" />}
        />
      </div>
      <div className="dialog-list-item__content">
        <div className="dialog-list-item__header">
          <div className="dialog-list-item__companion">
            {getFullName()}
          </div>
          <div className="dialog-list-item__date">
            {format(new Date(date),
              new Date(date).getDate() === new Date().getDate() ? "p" : "P",
              { locale: ruLocale })
            }
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
                <MessageStatusIcon hasRead={hasRead} />
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DialogListItem;