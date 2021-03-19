/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import "./dialog.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import Avatar from "../../Avatar/Avatar";
import { getAuthorOrCompanionDependsOnUserID, getFullName } from "tools";
import dialogsActionCreators from "store/dialogs/actionCreators";
import { IDialog } from "tools/interfaces";
import { useSelector } from "tools/hooks";
import { Menu, Dropdown } from "antd";
import { postDeleteDialog } from "store/dialogs/thunkCreators";
import socket from "core/socket";
import socketEvents from "core/socket/events";

interface IProps {
  item: IDialog;
  typing?: boolean;
}

const DialogListItem: React.FC<IProps> = ({ item, typing }) => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);
  const [isOnline, setOnline] = useState<boolean | undefined | null>(false);

  const listenOnline = () => {
    socket.emit(
      socketEvents.isOnline,
      userID && getAuthorOrCompanionDependsOnUserID(userID, item)._id,
      (isOnline: boolean | undefined | null) => {
        setOnline(isOnline);
        isOnline && dispatch(dialogsActionCreators.setUserOnline(isOnline));
      },
    );
  };

  useEffect(() => {
    listenOnline();
    const onlineInterval = setInterval(listenOnline, 60 * 1000);
    return () => {
      clearInterval(onlineInterval);
    };
  }, []);

  const removeDialog = () => {
    dispatch(postDeleteDialog(item._id));
  };

  const menu = (
    <Menu>
      <Menu.Item key="removeMessage" onClick={removeDialog}>Удалить диалог</Menu.Item>
    </Menu>
  );

  const handleClick = () => {
    dispatch(dialogsActionCreators.setCurrentDialog(item));
  };

  return (
    <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div
        className={currentDialogID === item._id ? "dialog dialog_selected" : "dialog"}
        onClick={handleClick}>
        <div className="dialog__avatar">
          {userID && <Avatar
            user={getAuthorOrCompanionDependsOnUserID(userID, item)}
            online={isOnline}
          />}
        </div>
        <div className="dialog__content">
          <div className="dialog__header">
            <div className="dialog__companion">
              {userID && getFullName(getAuthorOrCompanionDependsOnUserID(userID, item))}
            </div>
            <div className="dialog__date">
              {format(new Date(item.updatedAt),
                new Date(item.updatedAt).getDate() === new Date().getDate() ? "p" : "P",
                { locale: ruLocale })
              }
            </div>
          </div>
          <div className="dialog__footer">
            <div className="dialog__message">
              {typing && <span className="dialog__typing">
                <span className="dialog__typing-circle" />
                <span className="dialog__typing-circle" />
                <span className="dialog__typing-circle" />
              </span>}
              {typing ? "печатает" : item.lastMessage.text}
            </div>
            {
              item.lastMessage ?
                <div className="dialog__count">
                  {999}
                </div>
                :
                <div className="dialog__status">
                  <MessageStatusIcon hasRead={item.lastMessage} />
                </div>
            }
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default DialogListItem;