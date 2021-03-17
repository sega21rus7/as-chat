/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./message.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import { IUser } from "tools/interfaces";
import Avatar from "../../Avatar/Avatar";
import { useSelector } from "tools/hooks";
import { Menu, Dropdown } from "antd";
import { postDeleteMessage } from "store/messages/thunkCreators";
import { useDispatch } from "react-redux";

interface IProps {
  _id: string;
  text: string;
  date: Date;
  author: IUser,
  hasRead?: boolean;
  className: string;
}

const Message: React.FC<IProps> = ({ _id, text, date, author, hasRead, className }) => {
  const userID = useSelector(state => state.auth.user?._id);
  const my = userID === author._id;
  const dispatch = useDispatch();

  const removeMessage = () => {
    dispatch(postDeleteMessage(_id));
  };

  const menu = (
    <Menu>
      <Menu.Item key="removeMessage" onClick={removeMessage}>Удалить сообщение</Menu.Item>
    </Menu>
  );

  return (
    <div className=
      {my ?
        ["message", "message_my", className].join(" ") :
        ["message", className].join(" ")
      }
    >
      {!my && <Avatar user={author} />}
      <div className="message__content">
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div className="message__bubble">
            <p className="message__text">{text}</p>
          </div>
        </Dropdown>
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