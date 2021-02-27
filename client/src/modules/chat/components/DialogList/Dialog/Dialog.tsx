import React from "react";
import { useDispatch } from "react-redux";
import format from "date-fns/format";
import ruLocale from "date-fns/locale/ru";
import "./dialog.scss";
import MessageStatusIcon from "../../MessageStatusIcon/MessageStatusIcon";
import Avatar from "../../Avatar/Avatar";
import { getFullName } from "tools";
import { setCurrentDialog } from "store/dialogs/actionCreators";
import { DialogType } from "tools/interfaces";
import { useSelector } from "tools/hooks";

interface PropsType {
  item: DialogType;
  className: string;
}

const DialogListItem: React.FC<PropsType> = ({ item, className }) => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.auth.user?._id);
  const currentDialogID = useSelector(state => state.dialogs.currentDialog?._id);

  const handleClick = () => {
    dispatch(setCurrentDialog(item));
  };

  return (
    <div
      className={
        currentDialogID === item._id ?
          ["dialog", "dialog_selected", className].join(" ") :
          ["dialog", className].join(" ")
      }
      onClick={handleClick}>
      <div className="dialog-avatar dialog__avatar">
        <Avatar
          additionalClassNames={["dialog-avatar__body"]}
          user={userID === item.author._id ? item.companion : item.author}
          additionalJSX={<div className="dialog__online" />}
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
            {item.messages[0].text}
          </div>
          {
            item.messages[0] ?
              <div className="dialog__count">
                {999}
              </div>
              :
              <div className="dialog__status">
                <MessageStatusIcon hasRead={item.messages[0].hasRead} />
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DialogListItem;