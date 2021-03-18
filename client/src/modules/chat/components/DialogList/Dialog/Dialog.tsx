import React from "react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import "./dialog.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import Avatar from "../../Avatar/Avatar";
import { getFullName } from "tools";
import dialogsActionCreators from "store/dialogs/actionCreators";
import messagesActionCreators from "store/messages/actionCreators";
import { IDialog } from "tools/interfaces";
import { useSelector } from "tools/hooks";
import { Menu, Dropdown } from "antd";
import { postDeleteDialog } from "store/dialogs/thunkCreators";

interface IProps {
  item: IDialog;
}

const DialogListItem: React.FC<IProps> = ({ item }) => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);

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
          <Avatar
            user={userID === item.author._id ? item.companion : item.author}
            online
          />
        </div>
        <div className="dialog__content">
          <div className="dialog__header">
            <div className="dialog__companion">
              {getFullName(userID === item.author._id ? item.companion : item.author)}
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
              {item.lastMessage.text}
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