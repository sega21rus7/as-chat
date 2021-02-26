import React from "react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import "./dialog_list_item.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import Avatar from "../../Avatar/Avatar";
import { getFullName } from "tools";
import { setCurrentDialog } from "store/dialogs/actionCreators";
import { DialogType } from "tools/interfaces";
import { useSelector } from "tools/hooks";

interface PropsType {
  dialog: DialogType;
}

const DialogListItem: React.FC<PropsType> = ({ dialog }) => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);

  const handleClick = () => {
    dispatch(setCurrentDialog(dialog));
  };

  return (
    <div
      className={currentDialogID === dialog._id ?
        "dialog-list-item dialog-list-item_selected" :
        "dialog-list-item"}
      onClick={handleClick}>
      <div className="dialog-list-item-avatar dialog-list-item__avatar">
        <Avatar
          additionalClassNames={["dialog-list-item-avatar__body"]}
          user={userID === dialog.author._id ? dialog.companion : dialog.author}
          additionalJSX={<div className="dialog-list-item__online" />}
        />
      </div>
      <div className="dialog-list-item__content">
        <div className="dialog-list-item__header">
          <div className="dialog-list-item__companion">
            {getFullName(userID === dialog.author._id ? dialog.companion : dialog.author)}
          </div>
          <div className="dialog-list-item__date">
            {format(new Date(dialog.updatedAt),
              new Date(dialog.updatedAt).getDate() === new Date().getDate() ? "p" : "P",
              { locale: ruLocale })
            }
          </div>
        </div>
        <div className="dialog-list-item__footer">
          <div className="dialog-list-item__message">
            {dialog.messages[0].text}
          </div>
          {
            dialog.messages[0] ?
              <div className="dialog-list-item__count">
                {999}
              </div>
              :
              <div className="dialog-list-item__status">
                <MessageStatusIcon hasRead={dialog.messages[0].hasRead} />
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DialogListItem;